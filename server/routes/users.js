const express = require('express');
const User = require('../controllers/user');
const router = express.Router();


router.post('/sign-in', User.auth);

router.post('/sign-up', User.signup);

module.exports = router;