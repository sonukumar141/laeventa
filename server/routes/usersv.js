const express = require('express');
const Userv = require('../controllers/userv');
const router = express.Router();


router.post('/sign-in', Userv.auth);

router.post('/vendor-sign-up', Userv.signup);

module.exports = router;