const express = require('express');
const router = express.Router();
const Jobh = require('../models/jobh');
const Userh = require('../models/userh');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrlh = require('../controllers/userh');

router.get('/secret', UserCtrlh.authMiddleware, function(req, res){
	res.json({"secret": true});
});

router.get('', function(req, res){
    Jobh.find({}, function(err, foundJobsh){
        res.json(foundJobsh);
    });
});

router.get('/:id', function(req, res){
    const jobhId = req.params.id;

    Jobh.findById(jobhId, function(err, foundJobsh){
        if(err){
            return res.status(422).send({errors: [{title: 'Job Error', detail: 'Could not find Job'}]});
        }
        res.json(foundJobsh);
    });
});



module.exports = router;