const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobhSchema = new Schema({
        name: { type: String, required: true, max: [128, 'Too long, max is 128 characters']},
        images: {type: ['Mixed']},
        tags: {type: ['Mixed']},
        image1: { type: String, required: true},
        image2: String,
        image3: String,
        image4: String,
        image5: String,
        plot_flat: { type: String, required: true},
        city: { type: String, required: true, lowercase: true },
        region: { type: String, required: true, lowercase: true},
        category: { type: String, required: true, lowercase: true },
        phone: { type: String, required: true},
        email: { type: String, required: true},
        pincode: { type: String, required: true},
        landmark: { type: String, required: true},
        open_timing: { type: String, required: true},
        close_timing: { type: String, required: true},
        min_rate: { type: Number, required: true},
        max_rate: { type: Number, required: true},
        usp1: { type: String, required: true},
        usp2: String,
        usp3: String,
        usp4: String,
        usp5: String,
        facilities: {type: ['Mixed']},
        summary: { type: String, required: true},
        venueareas: [{type: Schema.Types.ObjectId, ref: 'VenueAreas'}],
        userh: {type: Schema.Types.ObjectId, ref: 'Userh'}
});

module.exports = mongoose.model('Jobh', jobhSchema);