const express = require('express');
const router = express.Router();
const Jobv = require('../models/jobv');
const Userv = require('../models/userv');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrlv = require('../controllers/userv');

router.get('/secret', UserCtrlv.authMiddleware, function(req, res){
	res.json({"secret": true});
});

// router.get('', function(req, res){
//     Jobv.find({}, function(err, foundJobsv){
//         res.json(foundJobsv);
//     });
// });

router.get('/:id', function(req, res){
    const jobvId = req.params.id;

    Jobv.findById(jobvId, function(err, foundJobsv){
        if(err){
            return res.status(422).send({errors: [{title: 'Job Error', detail: 'Could not find Job'}]});
        }
        res.json(foundJobsv);
    });
});

router.get('', function(req, res){
	const city = req.query.city;

    if(city){
        Jobv.find({city: city.toLowerCase()})
            .exec(function(err, filteredJobsv){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if(filteredJobsv.length === 0){
            return res.status(422).send({errors: [{title: 'No vendors Found!', detail: `Currently no vendors listed in city ${city}`}]});
        }

        return res.json(filteredJobsv);
    })
        
    }

    else{
        Jobv.find({})
            .exec(function(err, foundJobsv){
                return res.json(foundJobsv);
            });
    }
});

router.post('', UserCtrlv.authMiddleware, function(req, res) {
    const {name, images, oldPrice, newPrice, city, street, category, phone, email,
    completeAddress, landmark, timings, veg_package, non_veg_package,
    dailyRate, discount, description, categoryId} = req.body;

	const userv = res.locals.userv;

	const jobv = new Jobv({name, images, oldPrice, newPrice, city, street, category, phone, email,
        completeAddress, landmark, timings, veg_package, non_veg_package,
        dailyRate, discount, description, categoryId});
	jobv.userv = userv;

	Jobv.create(jobv, function(err, newJobv) {
		if(err) {
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		Userv.update({_id: userv.id}, {$push: {jobsv: newJobv}}, function(){});

		return res.json(newJobv);
	});
});

module.exports = router;