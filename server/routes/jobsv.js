const express = require('express');
const router = express.Router();
const Jobv = require('../models/jobv');
const Userv = require('../models/userv');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrlv = require('../controllers/userv');

router.get('/secret', UserCtrlv.authMiddleware, function(req, res){
	res.json({"secret": true});
});

router.get('', function(req, res){
    Jobv.find({}, function(err, foundJobsv){
        res.json(foundJobsv);
    });
});

router.get('/:id', function(req, res){
    const jobvId = req.params.id;

    Jobv.findById(jobvId, function(err, foundJobsv){
        if(err){
            return res.status(422).send({errors: [{title: 'Job Error', detail: 'Could not find Job'}]});
        }
        res.json(foundJobsv);
    });
});



module.exports = router;