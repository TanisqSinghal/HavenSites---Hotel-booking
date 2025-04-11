const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
       type: String,
       default: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;