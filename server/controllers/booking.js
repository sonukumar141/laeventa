const Booking = require('../models/booking');
const Job = require('../models/job');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');

exports.createBooking = function(req, res) {
	const { startAt, endAt, totalPrice, guests, days, job } = req.body;
	const user = res.locals.user;

	const booking = new Booking({startAt, endAt, totalPrice, guests, days});

	Job.findById(job._id)
		.populate('bookings')
		.populate('user')
		.exec(function(err, foundJob){

			if(err){
				return res.status(422).send({errors: normalizeErrors(err.errors)});
			}

			if(foundJob.user.id === user.id){
				return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'Cannot create booking on your Job!'}]});
			}

			// check here for valid booking
			if(isValidBooking(booking, foundJob)) {
				booking.user = user;
				booking.job = foundJob;
				foundJob.bookings.push(booking);

				booking.save(function(err){
					if(err) {
						return res.status(422).send({errors: normalizeErrors(err.errors)});
					}

					foundJob.save()
					User.update({_id: user.id}, {$push: {bookings: booking}}, function(){});

					return res.json({startAt: booking.startAt, endAt: booking.endAt});
				});

			}else{
				return res.status(422).send({errors: [{title: 'Invalid Booking!', detail: 'Choosen dates are already taken!'}]});
			}
		})
} 


exports.getUserBookings = function(req, res){
	const user = res.locals.user;

	Booking
	   .where({user: user})
	   .populate('job')
	   .exec(function(err, foundBookings) {

	   	if(err) {
	   		return res.status(422).send({errors: normalizeErrors(err.errors)});
	   	}

	   	return res.json(foundBookings);
	});
}


function isValidBooking(proposedBooking, job){
	let isValid = true;

	if(job.bookings && job.bookings.length > 0){

		isValid = job.bookings.every(function(booking){
			const proposedStart = moment(proposedBooking.startAt);
			const proposedEnd = moment(proposedBooking.endAt);

			const actualStart = moment(booking.startAt);
			const actualEnd = moment(booking.endAt);

			return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
				


		});
	}

	return isValid;
}