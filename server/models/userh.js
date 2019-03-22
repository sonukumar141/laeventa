const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userhSchema = new Schema({
	category: {
		type: String
	}, 
    businessname: {
		type: String,
		min: [4, 'Too short, Min is 4 characers'],
		max: [32, 'Too Long, Max character is 32']
	},
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
		resetPasswordToken: String,
		resetPasswordExpires: Date,
		jobsh: [{type: Schema.Types.ObjectId, ref: 'Jobh'}],
		venueareas: [{type: Schema.Types.ObjectId, ref: 'VenueAreas'}]
});

userhSchema.methods.hasSamePassword = function(requestedPassword) {
	return requestedPassword === this.password;
	//return bcrypt.compareSync(requestedPassword, this.password);
}

// userhSchema.pre('save', function(next){
// 	const userh = this;

// 	bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(userh.password, salt, function(err, hash) {
//         // Store hash in your password DB.
//         	userh.password = hash;
//         	next();
//     	});
// 	});
// });

module.exports = mongoose.model('Userh', userhSchema);