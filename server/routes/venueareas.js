const express = require('express');
const router = express.Router();
const VenueAreaCtrl = require('../controllers/venueareas');

const UserCtrlh = require('../controllers/userh');

router.post('', UserCtrlh.authMiddleware, VenueAreaCtrl.createVenueArea);

router.delete('/:id', UserCtrlh.authMiddleware, VenueAreaCtrl.deleteVenueArea);

router.get('', UserCtrlh.authMiddleware, VenueAreaCtrl.getVenueAreas);

//router.get('', VenueAreaCtrl.getVenueArea);

module.exports = router;
