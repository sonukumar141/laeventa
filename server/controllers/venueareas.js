const VenueArea = require('../models/venuearea');
const Userh = require('../models/userh');
const Jobh = require('../models/jobh');
const { normalizeErrors } = require('../helpers/mongoose');

exports.createVenueArea = function(req, res){
    const {image1, image2, image3, image4, image5, image6, price, category, features, producth } = req.body;

    const userh = res.locals.userh;
    const venuearea = new VenueArea({image1, image2, image3, image4, image5, image6, price, category, features});

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
                return res.status(422).send({errors: [{title: 'Invalid User', detail: 'You are not allowed to delete'}]});
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