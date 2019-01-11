const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendor_userSchema = new Schema({

});

module.exports = mongoose.model('vendor_User', vendor_userSchema);