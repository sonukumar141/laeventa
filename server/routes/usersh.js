const express = require('express');
const Userh = require('../controllers/userh');
const router = express.Router();


router.post('/auth', Userh.auth);

router.post('/hotel-sign-in', Userh.signup);

module.exports = router;