const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venue_userSchema = new Schema({
    venuename: {
        type: String,
        min: [4, 'Too short, minimum 4 characters required'],
        max: [60, 'Too long, maximum 60 characters allowed']
    },
    venue_username: {
        type: String,
        min: [3, 'Too short, minimum 4 characters required'],
        max: [80, 'Too long, maximum 80 characters allowed']
    },
    venue_email: {
        type: String,
        min: [3, 'Too short, minimum 4 characters required'],
        max: [80, 'Too long, maximum 80 characters allowed'],
        unique: true,
        lowercase: true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    venue_password: {
        type: String,
        min: [4, 'Too short, minimum 4 characters required'],
        max: [60, 'Too long, maximum 60 characters allowed'],
        required: 'Password is required'

    },
    venue_jobs: [{type: Schema.Types.ObjectId, ref: ''}]
});

module.exports = mongoose.model('venue_User', venue_userSchema);