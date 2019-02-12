const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobhSchema = new Schema({
        name: { type: String, required: true, max: [128, 'Too long, max is 128 characters']},
        images: {type: [
                'Mixed'
            ]
        },
        image_small: String,
        image_medium: String,
        image_big: String,
        image_extra: String,
        oldPrice: Number,
        newPrice: Number,
        city: { type: String, required: true, lowercase: true },
        street: { type: String, required: true, min: [4, 'Too short, min is 4 characters']},
        category: { type: String, required: true, lowercase: true },
        phone: Number,
        email: String,
        completeAddress: String,
        landmark: String,
        timings: String,
        veg_package: Number,
        non_veg_package: Number,
        dailyRate: Number,
        shared: Boolean,
        wifi: String,
        ac: String,
        guests: Number,
        rooms: Number,  
        usp1: String,
        usp2: String,
        usp3: String,
        parking: String,
        restaurant: String,
        advance_payment: String,
        fireworks: String,
        music: String,
        lodging: String,
        seating_hall: String,
        seating_lawn: String,
        createdAt: { type: Date, default: Date.now },
        discount: Number,
        description: { type: String, required: true },
        categoryId: Number,
        userh: {type: Schema.Types.ObjectId, ref: 'Userh'}
});

module.exports = mongoose.model('Jobh', jobhSchema);