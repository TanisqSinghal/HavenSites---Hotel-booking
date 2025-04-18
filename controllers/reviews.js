const Listing = require('../models/listing');
const Review = require('../models/review'); // Adjust the path as necessary

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id; // Assuming you have user authentication set up
    // console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash('success', 'Your review has been added!');
    res.redirect(`/listings/${id}`);
};

module.exports.destoryReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Your review has been deleted!');
    res.redirect(`/listings/${id}`);
};