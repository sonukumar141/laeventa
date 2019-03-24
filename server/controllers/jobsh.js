const express = require('express');
const router = express.Router();
const Jobh = require('../models/jobh');
const VenueArea = require('../models/venuearea');
const VenueAreaCtrl = require('../controllers/venueareas');
const Jobv = require('../models/jobv');
const Userh = require('../models/userh');
const { normalizeErrors } = require('../helpers/mongoose');

exports.createJobh = function(req, res) {
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
        
}

exports.deleteJobh =  function(req, res){
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
}

exports.getJobhById =  function(req, res){
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
}

exports.patchJobhById = function(req, res){
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
        });
    });
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}