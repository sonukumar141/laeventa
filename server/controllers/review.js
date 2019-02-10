const User = require('../models/user');
const Job = require('../models/job');

const Review = require('../models/review');

const moment = require('moment');
const { normalizeErrors } = require('../helpers/mongoose');

exports.getReviews = function(req, res){
    const { jobId } = req.query;

    Review.find({'job': jobId})
          .populate('user')
          .exec((err, reviews) => {
                if(err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }

                return res.json(reviews);
        });
    }

// exports.createReview = function(req, res) {
//     const reviewData = req.body;
//     const { bookingId } = req.query;
//     const user = res.locals.user;

//     Booking.findById(bookingId)
//            .populate({path: 'job', populate: {path: 'user'}})
//            .populate('review')
//            .populate('user')
//            .exec(async(err, foundBooking) => {
//                 if(err){
//                     return res.status(422).send({errors: normalizeErrors(err.errors)});
//                 }          
                
//                 const {job} = foundBooking;

//                 if(job.user.id === user.id) {
//                     return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create review on your Job!'}]});
//                 }
                
//                 const foundBookingUserId = foundBooking.user.id;

//                 if(foundBookingUserId !== user.id) {
//                     return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create review on other\'s booking'}]});
//                 }


//                 const timeNow = moment();
//                 const endAt = moment(foundBooking.endAt);

//                 if(!endAt.isBefore(timeNow)){
//                     return res.status(422).send({errors: [{title: 'Invalid Date!', detail: 'You can review after booking is over'}]});
//                 }

//                 if(foundBooking.review) {
//                     return res.status(422).send({errors: [{title: 'Review already done!', detail: 'You have already reviewed this booking'}]});
//                 }               

//                 const review = new Review(reviewData);
//                 review.user = user;
//                 review.job = job;
//                 foundBooking.review = review;

//                 try{
//                     await foundBooking.save();
//                     const savedReview = await review.save();
                    
//                     return res.json(savedReview);
//                 }catch(err){
//                     return res.status(422).send({errors: normalizeErrors(err.errors)});
//                 }

//            });
// }

exports.createReview = function(req, res) {
    
    const { rating, text } = req.body;
    const user = res.locals.user;

    const review = new Review({rating, text});
    review.user = user;

    Review.create(review, function(err, newReview) {
		if(err) {
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		User.update({_id: user.id}, {$push: {review: newReview}}, function(){});
        
		return res.json(newReview);
	});
}