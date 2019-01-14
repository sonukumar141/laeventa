const express = require('express');
const Userh = require('../controllers/userh');
const router = express.Router();


router.post('/auth', Userh.auth);

router.post('/signup', Userh.signup);

module.exports = router;