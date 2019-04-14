const User = require('../models/user');
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

	User.findOne({email}, function(err, user) {
		if(err){
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		if(!user){
			return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'User does not exist'}]});
		}
		const p = user.hasSamePassword(password);//, function(err, isMatch){
		//	if(err) throw err;
		//	console.log(password, isMatch);
		//});
		if(p){
			// Jwt token
			const token = jwt.sign({
  			userId: user.id,
  			username: user.username
			}, config.SECRET, { expiresIn: '1h' });

			return res.json(token);

		}else {
			return res.status(422).send({errors: [{title: 'Wrong Data!', detail: 'Wrong email or password'}]});
		}
	});
}

exports.signup =  function(req, res){

	const {username, email, password, passwordConfirmation} = req.body;

	if(!password || !email) {
		return res.status(422).send({errors: [{title: 'Data Missing!', detail: 'Provide email and password'}]});
	}

	if(password != passwordConfirmation) {
		return res.status(422).send({errors: [{title: 'Invalid password!', detail: 'Password is not as confirmation'}]});

	}
	User.findOne({email}, function(err, existingUser){
		if(err){
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		if(existingUser){
			return res.status(422).send({errors: [{title: 'Invalid email!', detail: 'Email already registered'}]});
		}

		const user = new User({
			username,
			email,
			password
		});

		user.save(function(err){
			if(err){
				return res.status(422).send({errors: normalizeErrors(err.errors)});
			}

			return res.json({'registered': true});
		});
	});

}

exports.forgot =  function(req, res, next){
    async.waterfall([
        function(done){
            crypto.randomBytes(20, function(err, buf){
                const token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done){
            User.findOne({email: req.body.email}, function(err, user){
                if(!user){
                    return res.status(422).send({errors: [{title: 'Invalid email!', detail: 'User does not exist'}]});
                }
                  
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err){
                    done(err, token, user);
                });
            });
        },

        function(token, user, done){
            const smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: config.LAEVENTA_EMAIL,
                    pass: config.LAEVENTA_EMAIL_PASS
                }
            });

            const mailOptions = {
                to: user.email,
                from: config.LAEVENTA_EMAIL,
                subject: 'Laventa password reset',
                text: 'You are receiving this email. Please click on the email for password reset ' +
                      'http://' + req.headers.host + '/reset/' + token + '\n\n' + 
                      'If you did not request this, please ignore this email' 
            };
            smtpTransport.sendMail(mailOptions, function(err){
                console.log('mail sent');
                done(err, 'done');
            });

            res.sendStatus(200);
        }
    ], function(err){
        if(err) return next(err);
    });
}

exports.reset = function(req, res){
    async.waterfall([
        function(done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user){
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
                    user: config.LAEVENTA_EMAIL,
                    pass: config.LAEVENTA_EMAIL_PASS
                }
            });

            var mailOptions = {
                to: user.email,
                from: config.LAEVENTA_EMAIL,
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
		const user = parseToken(token);

		User.findById(user.userId, function(err, user){
			if(err){
				return res.status(422).send({errors: normalizeErrors(err.errors)});
			}

			if(user) {
				res.locals.user = user;
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