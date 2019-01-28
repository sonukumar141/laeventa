const express = require('express');
const router = express.Router();
const Jobh = require('../models/jobh');
const Jobv = require('../models/jobv');
const Userh = require('../models/userh');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrlh = require('../controllers/userh');

router.get('/secret', UserCtrlh.authMiddleware, function(req, res){
	res.json({"secret": true});
});

// router.get('', function(req, res){
//     Jobh.find({}, function(err, foundJobsh){
//         res.json(foundJobsh);
//     });
// });

router.get('/:id', function(req, res){
    const jobhId = req.params.id;

    Jobh.findById(jobhId, function(err, foundJobsh){
        if(err){
            return res.status(422).send({errors: [{title: 'Job Error', detail: 'Could not find Job'}]});
        }
        res.json(foundJobsh);
    });
});

router.get('', function(req, res){
    const city = req.query.city;
    
    if(city){
        Jobh.find({city: city.toLowerCase()})
            .exec(function(err, filteredJobsh){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if(filteredJobsh.length === 0){
            return res.status(422).send({errors: [{title: 'No hotels Found!', detail: `Currently no hotels listed in city ${city}`}]});
        }

        return res.json(filteredJobsh);
    })
        
    }

    else{
        Jobh.find({})
            .exec(function(err, foundJobsh){
                return res.json(foundJobsh);
            });
    }
    
});

router.get('/search', function(req, res){
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi ');
        Jobh.find({name: regex}, function(err, allJobsh){
            if(err){
                console.log(err);
            }else{
                res.render("products/index", {jobs: allJobsh})
            }
        });

        Jobv.find({name: regex}, function(err, allJobsv){
            if(err){
                console.log(err);
            }else{
                res.render("products/index", {jobs: allJobsv})
            }
        });

    }else {
        Jobh.find({}, function(err, allJobsh){
            if(err){
                console.log(err);
            }else{
                res.render("products/index", {jobsh: allJobsh});
            }
        });

        Jobv.find({}, function(err, allJobsv){
            if(err){
                console.log(err);
            }else{
                res.render("products/index", {jobsv: allJobsv});
            }
        });
        
    }
});

router.post('', UserCtrlh.authMiddleware, function(req, res) {
    const {name, images, image_small, image_medium, image_big, image_extra, oldPrice, newPrice, city, street, category, phone, email,
    completeAddress, landmark, timings, veg_package, non_veg_package,
    dailyRate, shared, ac, guests, rooms, discount, description, categoryId} = req.body;

	const userh = res.locals.userh;

	const jobh = new Jobh({name, images, image_small, image_medium, image_big, image_extra, oldPrice, newPrice, city, street, category, phone, email,
        completeAddress, landmark, timings, veg_package, non_veg_package,
        dailyRate, shared, ac, guests, rooms, discount, description, categoryId});
	jobh.userh = userh;

	Jobh.create(jobh, function(err, newJobh) {
		if(err) {
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		Userh.update({_id: userh.id}, {$push: {jobsh: newJobh}}, function(){});

		return res.json(newJobh);
	});
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;