const express = require('express');
const Userv = require('../controllers/userv');
const router = express.Router();


router.post('/auth', Userv.auth);

router.post('/signup', Userv.signup);

module.exports = router;