const Userh = require('../models/userh');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');	
const config = require('../config');
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

exports.auth =  function(req, res){
	const {email, password} = req.body;

	if(!password || !email) {
		return res.status(422).send({errors: [{title: 'Data Missing!', detail: 'Provide email and password'}]});
	}

	Userh.findOne({email}, function(err, userh) {
		if(err){
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		if(!userh){
			return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'User does not exist'}]});
		}
		if(userh.hasSamePassword(password)){
			// Jwt token
			const token = jwt.sign({
  			userId: userh.id,
			  username: userh.username,
			  category: userh.category
			}, config.SECRET, { expiresIn: '1h' });

			return res.json(token);

		}else {
			return res.status(422).send({errors: [{title: 'Wrong Data!', detail: 'Wrong email or password'}]});
		}
	});
}

exports.signup =  function(req, res){

    const {category, businessname, username, email, mobile, password, passwordConfirmation} = req.body;

    if(!email || !mobile || !password){
        return res.status(422).send({errors: [{title: 'Data Missing!', detail: 'Provide email, mobile and password'}]});
    }

	if(password != passwordConfirmation) {
		return res.status(422).send({errors: [{title: 'Invalid password!', detail: 'Password is not as confirmation'}]});
	}

    Userh.findOne({email}, function(err, existingUserh){
        if(err){
			return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        
		if(existingUserh){
			return res.status(422).send({errors: [{title: 'Invalid email!', detail: 'Email already registered'}]});
		}

		const userh = new Userh({
			category,
            businessname,
			username,
            email,
            mobile,
			password
        });
        
        userh.save(function(err){
			if(err){
				return res.status(422).send({errors: normalizeErrors(err.errors)});
			}

			return res.json({'registered': true});
		});
    });

}

exports.forgot = function(req, res, next){
    async.waterfall([
        function(done){
            crypto.randomBytes(20, function(err, buf){
                const token = buf.toString('hex');
                done(err, token);
			});
			console.log("first function");
        },
        function(token, done){
            Userh.findOne({email: req.body.email}, function(err, user){
                if(!user){
                    return res.status(422).send({errors: [{title: 'Invalid email!', detail: 'User does not exist'}]});
                }
                  
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err){
                    done(err, token, user);
                });
			});
			console.log("second function");
        },

        function(token, user, done){
            const smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'xxxx.com',
                    pass: 'xxxx'
                }
            });

            const mailOptions = {
                to: user.email,
                from: 'xxxx.com',
                subject: 'Nodejs password reset',
                text: 'You are receiving this email. Please click on the email for password reset ' +
                      'http://' + req.headers.host + '/reset-password/' + token + '\n\n' + 
                      'If you did not request this, please ignore this email'
            };
            smtpTransport.sendMail(mailOptions, function(err){
				console.log('mail sent');
                done(err, 'done');
			});
			console.log("third function");

			res.sendStatus(200);
		}
    ], function(err){
        if(err) return next(err);
	});
}	

exports.reset = function(req, res){
    async.waterfall([
        function(done) {
            Userh.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user){
                if(!user){
                    return res.status(422).send({errors: [{title: 'error', detail: 'Password reset token is invalid or has expired'}]});
                }

                if(req.body.password === req.body.confirm){
                    // user.setPassword(req.body.password, function(err){
                    //     user.resetPasswordToken = undefined;
                    //     user.resetPasswordExpires = undefined;

                    //     user.save(function(err){
                    //         //req.logIn(user, function(err) {
                    //             done(err, user);
                    //         //});
                    //     });
                    // });
                    user.password = req.body.password;
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;
                    user.save(function(err){
                        done(err, user);
                    });
                } else {
                    return res.status(422).send({errors: [{title: 'error', detail: 'Password do not match'}]});
                }
            });
        },
        function(user, done){
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'xxxx.com',
                    pass: 'xxxx'
                }
            });

            var mailOptions = {
                to: user.email,
                from: 'xxxx.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' + 
                    'This is a confirmation that the password for your account ' + user.email + ' has just changed'
            };
            smtpTransport.sendMail(mailOptions, function(err){
                done(err);
			});
			
			res.sendStatus(200);
        }
    ],   function(err){
        res.redirect('/');
	});
}

exports.authMiddleware = function(req, res, next){ 
	const token = req.headers.authorization;

	if(token){
		const userh = parseToken(token);

		Userh.findById(userh.userId, function(err, userh){
			if(err){
				return res.status(422).send({errors: normalizeErrors(err.errors)});
			}

			if(userh) {
				res.locals.userh = userh;
				next();
			}else{
				notAuthorized(res);
				
			}
		})

	}else{
		notAuthorized(res);
	}
}

function parseToken(token){

	return jwt.verify(token.split(' ')[1], config.SECRET);

}

function notAuthorized(res){
	return res.status(401).send({errors: [{title: 'Not authorized!', detail: 'You need to Login'}]});

}