const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//var passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
	username: {
		type: String,
		min: [4, 'Too short, Min is 4 characers'],
		max: [32, 'Too Long, Max character is 32']
	},
	email: {
		type: String,
		min: [4, 'Too short, Min is 4 characers'],
		max: [32, 'Too Long, Max character is 32'],
		unique: true,
		lowercase: true,
		required: 'Email is required',
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/] 
	},
	password: {
		type: String,
		min: [4, 'Too short, Min is 4 characers'],
		max: [32, 'Too Long, Max character is 32'],
		required: 'Password is required',

	},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
	jobs: [{type: Schema.Types.ObjectId, ref: 'Job'}],
	bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}]	

});

userSchema.methods.hasSamePassword = function(requestedPassword) {
	//console.log(bcrypt.compareSync(requestedPassword, this.password));
	//requestedPassword = this.password;
	//var hash = bcrypt.hashSync(requestedPassword, 10);
	//console.log(bcrypt.compareSync(requestedPassword, hash));
	//console.log(requestedPassword);
	return requestedPassword === this.password;//, function(err, isMatch){
	//	if(err) return cb(err);
	//	cb(null, isMatch);
	//});
	//return bcrypt.compareSync(requestedPassword, this.password);
}


// userSchema.pre('save', function(next){
// 	const user = this;

// 	//bcrypt.genSalt(10, function(err, salt) {
//     var hash = bcrypt.hashSync(user.password, 10)//, function(err, hash) {
//         // Store hash in your password DB.
//         //	user.password = hash;
//         //	next();
//     //	});
// 	//});
// 	user.password = hash;
// 	next();
// });

//userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);