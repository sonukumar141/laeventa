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
        usp1: { type: String, required: true},
        usp2: String,
        usp3: String,
        usp4: String,
        usp5: String,
        facilities: {type: ['Mixed']},
        summary: { type: String, required: true},
        lodging_policy: String,
        lodging_room_average_price: Number,
        food_policy: String,
        alcohol_policy: String,
        decor_policy: String,
        payment_policy_percentage: Number,
        cancellation_policy_percentage: Number,

        parking_policy: { type: String, required: true},
        parking_space_cars: { type: Number, required: true},
        parking_space_bikes: { type: Number, required: true},

        equipments_available_policy: String,
        canteen_available_policy: String,
        washroom_available_policy: String,
        scoreboard_available_policy: String,
        commentator_available_policy: String,
        power_backup_available_policy: String,

        policy_terms : { type: String, required: true},

        job_count : {type : Number, default: 0},

        venueareas: [{type: Schema.Types.ObjectId, ref: 'VenueAreas'}],
        userh: {type: Schema.Types.ObjectId, ref: 'Userh'}
});

module.exports = mongoose.model('Jobh', jobhSchema);