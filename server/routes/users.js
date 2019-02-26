const express = require('express');
const User = require('../controllers/user');
const Usermodel = require('../models/user');
const router = express.Router();
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');	
const config = require('../config');


router.post('/sign-in', User.auth);

router.post('/sign-up', User.signup);


//forgot password

router.get('/forgot', function(req, res){
    res.render('forgot');
});

router.post('/forgot', function(req, res, next){
    async.waterfall([
        // function(done){
        //     crypto.randomBytes(20, function(err, buf){
        //         const token = buf.toString('hex');
        //         done(err, token);
        //     });
        // },
        function(done){
            Usermodel.findOne({email: req.body.email}, function(err, user){
                if(!user){
                    return res.status(422).send({errors: [{title: 'Invalid email!', detail: 'User does not exist'}]});
                }

                const token = jwt.sign({
                    userId: user.id,
                    username: user.username,
                    resetPasswordToken: user.resetPasswordToken
                  }, config.SECRET, { expiresIn: '1h' });
                  
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
                    user: 'XXXX',
                    pass: 'XXXX'
                }
            });

            const mailOptions = {
                to: user.email,
                from: 'sonukumar141@gmail.com',
                subject: 'Nodejs password reset',
                text: 'You are receiving this email. Please click on the email for password reset ' +
                      'http://' + req.headers.host + '/reset/' + token + '\n\n' + 
                      'If you did not request this, please ignore this email' +
                      'Your password is 1234'
            };
            smtpTransport.sendMail(mailOptions, function(err){
                console.log('mail sent');
                done(err, 'done');
            });
        }
    ], function(err){
        if(err) return next(err);
    });
});

router.get('/reset/:token', function(req, res){
    Usermodel.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now() } }, function(err, user){
        if(!user) {
            return res.status(422).send({errors: [{title: 'Invalid token!', detail: 'User does not exist'}]});
        }   
        res.json('reset', {token: req.params.token});
    });
});

router.post('/reset/:token', function(req, res){
    async.waterfall([
        function(done) {
            Usermodel.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user){
                if(!user){
                    return res.status(422).send({errors: [{title: 'error', detail: 'Password reset token is invalid or has expired'}]});
                }

                if(req.body.password === req.body.confirm){
                    user.setPassword(req.body.password, function(err){
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(function(err){
                            req.logIn(user, function(err) {
                                done(err, user);
                            });
                        });
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
                    user: 'XXXX',
                    pass: 'XXXX'
                }
            });

            var mailOptions = {
                to: user.email,
                from: 'sonukumar141@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' + 
                    'This is a confirmation that the password for your account ' + user.email + ' has just changed'
            };
            smtpTransport.sendMail(mailOptions, function(err){
                done(err);
            });
        }
    ],   function(err){
        res.redirect('/');
    });
});

module.exports = router;