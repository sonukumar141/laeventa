const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uservSchema = new Schema({
    businessname: {
		type: String,
		min: [4, 'Too short, Min is 4 characers'],
		max: [32, 'Too Long, Max character is 50']
    },
	businesstype: {type: String,
		min: [4, 'Too short, Min is 4 characers'],
		max: [32, 'Too Long, Max character is 64']
    },
    username: {
		type: String,
		min: [4, 'Too short, Min is 4 characers'],
		max: [32, 'Too Long, Max character is 50']
	},
	email: {
		type: String,
		min: [4, 'Too short, Min is 4 characers'],
		max: [32, 'Too Long, Max character is 50'],
		unique: true,
		lowercase: true,
		required: 'Email is required',
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/] 
    },
    mobile: {
        type: Number,
        required: 'Mobile number is required',
        match: [/^[5-9]\d{9}$/]
    },
    password: {
		type: String,
		min: [4, 'Too short, Min is 4 characers'],
		max: [32, 'Too Long, Max character is 32'],
		required: 'Password is required',

    },
    jobsv: [{type: Schema.Types.ObjectId, ref: 'Jobv'}]
});

uservSchema.methods.hasSamePassword = function(requestedPassword) {
	return bcrypt.compareSync(requestedPassword, this.password);
}

uservSchema.pre('save', function(next){
	const userv = this;

	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(userv.password, salt, function(err, hash) {
        // Store hash in your password DB.
        	userv.password = hash;
        	next();
    	});
	});
});

module.exports = mongoose.model('Userv', uservSchema);