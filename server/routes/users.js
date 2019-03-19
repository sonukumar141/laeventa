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

router.post('/forgot',User.forgot);

router.post('/reset/:token',User.reset);


router.get('/forgot', function(req, res){
    res.render('forgot');
});


router.get('/reset/:token', function(req, res){
    Usermodel.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now() } }, function(err, user){
        if(!user) {
            return res.status(422).send({errors: [{title: 'Invalid token!', detail: 'User does not exist'}]});
        }   
        res.json('reset', {token: req.params.token});
    });
});


module.exports = router;