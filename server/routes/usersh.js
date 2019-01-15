const express = require('express');
const Userh = require('../controllers/userh');
const router = express.Router();


router.post('/sign-in', Userh.auth);

router.post('/hotel-sign-up', Userh.signup);

module.exports = router;