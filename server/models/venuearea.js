const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const areaSchema = new Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    image1: {type: String, required: true},
    image2: String,
    image3: String,
    image4: String,
    image5: String,
    price_per_plate: Number,
    price_per_hour: Number,
    price_per_day: Number,
	description: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    userh: { type: Schema.Types.ObjectId, ref: 'Userh' },
    jobh: { type: Schema.Types.ObjectId, ref: 'Jobh' }
});

module.exports = mongoose.model('VenueAreas', areaSchema);