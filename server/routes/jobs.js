const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');

const UserCtrl = require('../controllers/user');

router.get('/secret', UserCtrl.authMiddleware, function(req, res){
	res.json({"secret": true});
});

router.get('/manage', UserCtrl.authMiddleware, function(req, res) {
	const user = res.locals.user;

	Job.where({user: user})
	   .populate('bookings')
	   .exec(function(err, foundJobs) {

	   	if(err) {
	   		return res.status(422).send({errors: normalizeErrors(err.errors)});
	   	}

	   	return res.json(foundJobs);
	})
});

router.get('/:id/verify-user', UserCtrl.authMiddleware, function(req, res){
	const user = res.locals.user;

	Job.findById(req.params.id)
	   .populate('user')
	   .exec(function(err, foundJob){
		  	if(err) {
		  		return res.status(422).send({errors: normalizeErrors(err.errors)});
		  	}

		  	if(foundJob.user.id !== user.id) {
		  		return res.status(422).send({errors: [{title: 'Invalid User', detail: 'This job does not belongs to you.'}]});
		  	}

		  	return res.json({status: 'verfied'});
	   });

});

router.get('/:id', function(req, res){

	const jobId = req.params.id;

	Job.findById(jobId)
		.populate('user', 'username -_id')
		.populate('bookings', 'startAt endAt -_id')
		.exec(function(err, foundJob) {
			if(err){
				return res.status(422).send({errors: [{title: 'Job Error', detail: 'Could not find Job'}]});
			}

			return res.json(foundJob);
		});
});

router.patch('/:id', UserCtrl.authMiddleware, function(req, res) {
	const jobData = req.body;
	const user = res.locals.user;

	Job
	  .findById(req.params.id)
	  .populate('user')
	  .exec(function(err, foundJob) {
	  		if(err) {
	  			return res.status(422).send({errors: normalizeErrors(err.errors)});
	  		}

	  		if(foundJob.user.id !== user.id) {
	  			return res.status(422).send({errors: [{title: 'Invalid User', detail: 'This job does not belongs to you.'}]});
	  		}

	  		foundJob.set(jobData);
	  		foundJob.save(function(err) {
		  		if(err) {
		  			return res.status(422).send({errors: normalizeErrors(err.errors)});
		  		}	  			

		  		return res.status(200).send(foundJob);
	  		});
	  });
});


router.delete('/:id', UserCtrl.authMiddleware, function(req, res) {
	const user = res.locals.user;
	Job
	    .findById(req.params.id)
	    .populate('user', '_id')
	    .populate({
	   		path: 'bookings',
	   		select: 'startAt',
	   		match: { startAt: { $gt: new Date()}}
	    })
	    .exec(function(err, foundJob) {
	   		if(err){
	   			return res.status(422).send({errors: normalizeErrors(err.errors)});
	   		}

	   		if(user.id !== foundJob.user.id) {
	   			return res.status(422).send({errors: [{title: 'Invalid User', detail: 'This job does not belongs to you.'}]});
	   		}

	   		if(foundJob.bookings.length > 0) {
	   			return res.status(422).send({errors: [{title: 'Active Bookings!', detail: 'Cannot delete job with active booking!'}]});
	   		}

	   		foundJob.remove(function(err){
	   			if(err){
	   				return res.status(422).send({errors: normalizeErrors(err.errors)});
	   			} 

	   			return res.json({'status': 'deleted'});
	   		});
	   });
});

router.post('', UserCtrl.authMiddleware, function(req, res) {
	const {title, city, street, category, image, description, price} = req.body;
	const user = res.locals.user;

	const job = new Job({title, city, street, category, image, description, price});
	job.user = user;

	Job.create(job, function(err, newJob) {
		if(err) {
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		User.update({_id: user.id}, {$push: {jobs: newJob}}, function(){});

		return res.json(newJob);
	});
});

router.get('', function(req, res){
	const city = req.query.city;

	const query = city ? {city: city.toLowerCase()} : {};

		Job.find(query)
			.select('-bookings')
			.exec(function(err, foundJobs) {

		if(err) {
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		if(city && foundJobs.length === 0) {
			return res.status(422).send({errors: [{title: 'No Jobs Found!', detail: `There are no jobs for city ${city}`}]});
		}

			return res.json(foundJobs);
		});
});



module.exports = router;