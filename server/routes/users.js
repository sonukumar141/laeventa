const express = require('express');
const User = require('../controllers/user');
const Usermodel = require('../models/user');
const router = express.Router();
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");


router.post('/sign-in', User.auth);

router.post('/sign-up', User.signup);


//forgot password

router.get('/forgot', function(req, res){
    res.render('forgot');
});

router.post('/forgot', function(req, res, next){
    async.waterfall([
        function(done){
            crypto.randomBytes(20, function(err, buf){
                const token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done){
            Usermodel.findOne({email: req.body.email}, function(err, user){
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
                    user: 'xxxxxxxxxxx',
                    pass: 'xxxxxxxxxxx'
                }
            });

            const mailOptions = {
                to: user.email,
                from: 'sonukumar141@gmail.com',
                subject: 'Nodejs password reset',
                text: 'You are receiving this email. Please click on the email for password reset ' +
                      'http://' + req.headers.host + '/reset/' + token + '\n\n' + 
                      'If you did not request this, please ignore this email'
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

module.exports = router;