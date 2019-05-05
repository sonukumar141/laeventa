const express = require('express');
const router = express.Router();
const Jobh = require('../models/jobh');
const Jobv = require('../models/jobv');
const Userh = require('../models/userh');
const { normalizeErrors } = require('../helpers/mongoose');
const config = require('../config');
const nodemailer = require("nodemailer");

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


router.get('', function(req, res){
    const city = req.query.city;
    
    if(city){
        Jobh.find({city: city.toLowerCase()})
            .exec(function(err, filteredJobsh){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if(filteredJobsh.length === 0){
            return res.status(422).send({errors: [{title: 'No Venue Found!', detail: `Currently no venues listed in city: ${city}`}]});
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
            return res.status(422).send({errors: [{title: 'No venues Found!', detail: `Currently no venues listed in category: ${category}`}]});
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
            Userh.update({_id:userh.id}, {$set: {job_count: 0}}, function(){});
             console.log("Job count after deletion");
             console.log(userh.job_count);
            foundJobh.remove(function(err){
                
                if(err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }
                    // send email to user
                    const smtpTransport = nodemailer.createTransport({
                        service: 'Gmail',
                        auth: {
                            user: config.LAEVENTA_EMAIL,
                            pass: config.LAEVENTA_EMAIL_PASS
                        }
                    });

                    const mailOptions = {
                        to: userh.email,
                        from: config.LAEVENTA_EMAIL,
                        subject: 'Your listing has been deleted',
                        text: 'You have deleted listing with Laeventa. Visit www.laeventa.com to create new listing. ' +
                               'Thank You.'
                    };
                    smtpTransport.sendMail(mailOptions, function(err){
                        console.log('mail sent');
                        done(err, 'done');
                    });
                    // send email finished
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
    const {name, images, tags, image1, image2, image3, image4, image5,
        plot_flat, city, region, category, phone, email, pincode, landmark, 
        open_timing, close_timing, usp1, usp2, usp3, usp4, usp5, 
        facilities, summary, lodging_policy, lodging_room_average_price, 
        food_policy, alcohol_policy, decor_policy, payment_policy_percentage,
        cancellation_policy_percentage, parking_policy, parking_space_cars,
        parking_space_bikes, equipments_available_policy,
        canteen_available_policy, washroom_available_policy, scoreboard_available_policy,
        commentator_available_policy, policy_terms, job_count,
        power_backup_available_policy} = req.body;

    const userh = res.locals.userh;

    const jobh = new Jobh({name, images, tags, image1, image2, image3, image4, image5,
        plot_flat, city, region, category, phone, email, pincode, landmark, 
        open_timing, close_timing, usp1, usp2, usp3, usp4, usp5, 
        facilities, summary, lodging_policy, lodging_room_average_price, 
        food_policy, alcohol_policy, decor_policy, payment_policy_percentage,
        cancellation_policy_percentage, parking_policy, parking_space_cars,
        parking_space_bikes, equipments_available_policy,
        canteen_available_policy, washroom_available_policy, scoreboard_available_policy,
        commentator_available_policy, policy_terms, job_count,
        power_backup_available_policy});
    jobh.userh = userh;
    
    if(userh.job_count == 0)
    {
        Jobh.create(jobh, function(err, newJobh) {

            if(err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            Userh.update({_id: userh.id}, {$push: {jobsh: newJobh}}, function(){});
            Userh.update({_id:userh.id}, {$set: {job_count: 1}}, function(){});
            // send email to user
            const smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: config.LAEVENTA_EMAIL,
                    pass: config.LAEVENTA_EMAIL_PASS
                }
            });

            const mailOptions = {
                to: userh.email,
                from: config.LAEVENTA_EMAIL,
                subject: 'New Listing Created',
                text: 'You have created new listing with Laeventa. For more information visit www.laeventa.com ' +
                      ' Thank You.'
            };
            smtpTransport.sendMail(mailOptions, function(err){
				console.log('mail sent');
                done(err, 'done');
            });
            
            // send email finish

            return res.json(newJobh);
        });
    }
    else{
        return res.status(422).send({errors: [{title: 'Invalid command', detail: 'Cannot create more than one listing. Delete exiting listing to create new.'}]});
    }
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