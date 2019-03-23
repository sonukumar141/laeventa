const express = require('express');
const router = express.Router();
const Jobh = require('../models/jobh');
const VenueArea = require('../models/venuearea');
const VenueAreaCtrl = require('../controllers/venueareas');
const Jobv = require('../models/jobv');
const Userh = require('../models/userh');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrlh = require('../controllers/userh');

router.get('/secret', UserCtrlh.authMiddleware, function(req, res){
	res.json({"secret": true});
});

// router.get('', function(req, res){
//     Jobh.find({})
//     //.populate('venueareas')
//     .exec(function(err, foundJobh){
//         if(err){
//             return res.status(422).send({errors: [{title: 'Job Error', detail: 'Could not find Job'}]});
//         }
//         return res.json(foundJobh);
//     });
// });
router.get('/manage', UserCtrlh.authMiddleware, function(req, res){
    const userh = res.locals.userh;
    Jobh.where({userh})
        .exec(function(err, foundJobsh){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            return res.json(foundJobsh);
        });
});

router.get('/:id', function(req, res){
    const jobhId = req.params.id;

    Jobh.findById(jobhId)
        .populate('venueareas')
        .exec(function(err, foundJobh){
            if(err){
                return res.status(422).send({errors: [{title: 'Job Error', detail: 'Could not find Job'}]});
            }
            return res.json(foundJobh);
        });

    // Jobh.findById(jobhId, function(err, foundJobsh){
    //     if(err){
    //         return res.status(422).send({errors: [{title: 'Job Error', detail: 'Could not find Job'}]});
    //     }
    //     res.json(foundJobsh);
    // });
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
    });
        
    }

    else{
        Jobh.find({})
            .exec(function(err, foundJobsh){
                return res.json(foundJobsh);
            });
    }
    
});

router.get('/category', function(req, res){
    const category = req.query.category;
    
    if(category){
        Jobh.find({category: category.toLowerCase()})
            .exec(function(err, filteredJobsh){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if(filteredJobsh.length === 0){
            return res.status(422).send({errors: [{title: 'No hotels Found!', detail: `Currently no hotels listed in category ${category}`}]});
        }

        return res.json(filteredJobsh);
    });
}

    else{
        Jobh.find({})
            .exec(function(err, foundJobsh){
                return res.json(foundJobsh);
            });
    }
    //return res.json({category});
    
});

router.patch('/:id', UserCtrlh.authMiddleware, function(req, res){
    const jobhData = req.body;
    const userh = res.locals.userh;

    Jobh.findById(req.params.id)
        .populate('userh')
        .exec(function(err, foundJobh){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            if(foundJobh.userh.id !== userh.id){
                return res.status(422).send({errors: [{title: 'Invalid User', detail: 'You are not allowed to update'}]});
            }

            foundJobh.set(jobhData);
            foundJobh.save(function(err){
                if(err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }

                return res.status(200).send(foundJobh);
            })
        });
});

router.delete('/:id', UserCtrlh.authMiddleware, function(req, res){
    const userh = res.locals.userh;
    Jobh.findById(req.params.id)
        .populate('userh', '_id')
        .exec(function(err, foundJobh){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            if(userh.id !== foundJobh.userh.id){
                return res.status(422).send({errors: [{title: 'Invalid User', detail: 'You are not allowed to delete'}]});
            }

            foundJobh.remove(function(err){
                if(err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }

                return res.json({'status': 'deleted'});
            });
        });
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
    const {name, images, tags, image_small, image_medium, image_big, image_extra, oldPrice, 
           newPrice, city, street, category, phone, email, completeAddress, landmark, 
           timings, veg_package, non_veg_package, caterer, dailyRate, shared, wifi, ac, guests, 
           rooms, usp1, usp2, usp3, parking, restaurant, advance_payment, 
           fireworks, music, theater, print_scan, open_space, party_room, stage, bar,
           lodging, seating, discount, description, categoryId, badminton, basketball,
           cricket, football, futsal, hockey, netball, squash, table_tennis,
           tennis, volley_ball, swimming, gym} = req.body;

    const userh = res.locals.userh;

    const jobh = new Jobh({name, images, tags, image_small, image_medium, image_big, image_extra, oldPrice, 
                           newPrice, city, street, category, phone, email, completeAddress, landmark, 
                           timings, veg_package, caterer, non_veg_package, caterer, dailyRate, shared, wifi, ac, guests, 
                           rooms, usp1, usp2, usp3, parking, restaurant, advance_payment, 
                           fireworks, music, theater, print_scan, open_space, party_room, stage, bar, lodging, 
                           seating, discount, description, categoryId, badminton, basketball,
                           cricket,football, futsal, hockey, netball, squash, table_tennis,
                           tennis, volley_ball, swimming, gym});
	jobh.userh = userh;
    

    Jobh.create(jobh, function(err, newJobh) {
        if(err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        Userh.update({_id: userh.id}, {$push: {jobsh: newJobh}}, function(){});

        return res.json(newJobh);
    });
        
});

function isValid(proposedCreateJob, jobh){

}
// router.get('/venuearea', UserCtrlh.authMiddleware, function(req, res){
//     const userh = res.locals.userh;

//     VenueArea.findById(req.params.id)
//        // .populate('userh')
//         .exec(function(err, foundVenueArea){
//             if(err){
//                 return res.status(422).send({errors: normalizeErrors(err.errors)});
//             }

//             if(userh.id !== foundVenueArea.userh.id){
//                 return res.status(422).send({errors: [{title: 'Invalid User', detail: 'You are not allowed to delete'}]});
//             }
//             res.json(foundVenueArea);
//         });
// });

// router.get('/venuearea', UserCtrlh.authMiddleware, function(req, res){
        
    
// });


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;