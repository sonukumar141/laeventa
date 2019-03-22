const express = require('express');
const router = express.Router();
const VenueAreaCtrl = require('../controllers/venueareas');
const Jobv = require('../models/jobv');
const Userh = require('../models/userh');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrlh = require('../controllers/userh');

router.post('', UserCtrlh.authMiddleware, VenueAreaCtrl.createVenueArea);

module.exports = router;