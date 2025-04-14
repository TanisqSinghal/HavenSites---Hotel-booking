const express = require('express');
const router = express.Router({ mergeParams: true }); // Merge params from parent route
const wrapAsync = require('../utils/wrapAsync'); // Custom utility function for async error handling
const ExpressError = require('../utils/ExpressError'); // Error handling middleware
const { reviewSchema } = require('../schema.js'); // Adjust the path as necessary
const Review = require('../models/review'); // Adjust the path as necessary
const Listing = require('../models/listing'); // Adjust the path as necessary

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(','); // how does it working? // error.details is an array of error objects, each containing a message property.
        throw new ExpressError(400, msg); // Custom error handling
    } else {
        next(); // Proceed to the next middleware or route handler
    }
};


//Reviews part
//post route for reviews
router.post("/", validateReview, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash('success', 'Your review has been added!');
    res.redirect(`/listings/${id}`);
}));

//delete route for reviews
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Your review has been deleted!');
    res.redirect(`/listings/${id}`);
}));

module.exports = router;