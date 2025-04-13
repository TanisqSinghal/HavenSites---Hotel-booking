const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review'); // Adjust the path as necessary

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

listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing) {
        await Review.deleteMany({_id: { $in: listing.reviews }});
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;