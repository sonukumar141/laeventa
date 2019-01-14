const express = require('express');
const User = require('../controllers/user');
const router = express.Router();


router.post('/auth', User.auth);

router.post('/sign-in', User.signup);

module.exports = router;