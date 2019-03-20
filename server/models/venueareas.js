const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const areaSchema = new Schema({
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String,
    image6: String,
	price: Number,
	features: {type: ['Mixed']},
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('VenueAreas', areaSchema);