const Jobh = require('../models/jobh');
const Userh = require('../models/userh');
const { normalizeErrors } = require('../helpers/mongoose');

exports.createJobh = function(req, res) {
    const {name, images, tags, image1, image2, image3, image4, image5,
        plot_flat, city, region, category, phone, email, pincode, landmark, 
        open_timing, close_timing, min_rate, max_rate, usp1, usp2, usp3, usp4, usp5, 
        facilities, summary, lodging_policy, lodging_room_average_price, 
        food_policy, alcohol_policy, decor_policy, payment_policy_percentage,
        cancellation_policy_percentage, parking_policy, parking_space_cars,
        parking_space_bikes, equipments_available_policy,
        canteen_available_policy, washroom_available_policy, scoreboard_available_policy,
        power_backup_available_policy} = req.body;

    const userh = res.locals.userh;

    const jobh = new Jobh({name, images, tags, image1, image2, image3, image4, image5,
        plot_flat, city, region, category, phone, email, pincode, landmark, 
        open_timing, close_timing, min_rate, max_rate, usp1, usp2, usp3, usp4, usp5, 
        facilities, summary, lodging_policy, lodging_room_average_price, 
        food_policy, alcohol_policy, decor_policy, payment_policy_percentage,
        cancellation_policy_percentage, parking_policy, parking_space_cars,
        parking_space_bikes, equipments_available_policy,
        canteen_available_policy, washroom_available_policy, scoreboard_available_policy,
        power_backup_available_policy});
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