const VenueArea = require('../models/venuearea');
const Userh = require('../models/userh');
const Jobh = require('../models/jobh');
const { normalizeErrors } = require('../helpers/mongoose');

exports.createVenueArea = function(req, res){
    const {name, category, image1, image2, image3, image4, image5, price_per_plate,
           price_per_hour, price_per_day, description, producth } = req.body;

    const userh = res.locals.userh;
    const venuearea = new VenueArea({name, category, image1, image2, image3, image4, image5, price_per_plate,
        price_per_hour, price_per_day, description, producth});

   // venuearea.userh = userh;

    Jobh.findById(producth._id)
        .populate('venueareas')
        .populate('userh')
        .exec(function(err, foundJobh){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            if(foundJobh.userh.id !== userh.id){
                return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You cannot add venue area'}]});
            }
            venuearea.userh = userh;
            venuearea.jobh = foundJobh;
            foundJobh.venueareas.push(venuearea);

            venuearea.save(function(err){
                if(err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }

                foundJobh.save();

                Userh.update({_id: userh.id}, {$push: {venueareas: venuearea}}, function(){});

                res.json({"created": "true"});
            });
            
        });
    // VenueArea.create(venuearea, function(err, newVenueArea){
    //     if(err){
    //         return res.status(422).send({errors: normalizeErrors(err.errors)});
    //     }

    //     Userh.update({_id: userh.id}, {$push: {areas: newVenueArea}}, function(){});

    //     return res.json(newVenueArea);
    // });
}

exports.deleteVenueArea = function(req, res){
    const userh = res.locals.userh;
    VenueArea.findById(req.params.id)
        .populate('userh', '_id')
        .exec(function(err, foundVenueArea){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            if(userh.id !== foundVenueArea.userh.id){
                return res.status(422).send({errors: [{title: 'Invalid User', detail: 'This is not your Listing. Go to manage section'}]});
            }

            foundVenueArea.remove(function(err){
                if(err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }

                return res.json({'status': 'deleted'});
            });
        });
}

exports.getVenueAreas =  function(req, res){
    const userh = res.locals.userh;
    VenueArea.where({userh})
        .exec(function(err, foundVenueAreas){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            return res.json(foundVenueAreas);
        });
}
// exports.getVenueArea = function(req, res){
//     const {jobh } = req.body;
//     VenueArea.find({})
//     //.populate('venueareas')
//     .exec(function(err, foundVenueArea){
//         if(err){
//             return res.status(422).send({errors: [{title: 'No venue area', detail: 'Venue area could not be found'}]});
//         }
//         if(jobh._id == foundVenueArea.jobh.id)
//         return res.json(foundVenueArea);
//     });
// }