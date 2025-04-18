const express = require('express');
const router = express.Router({ mergeParams: true }); // Merge params from parent route
const wrapAsync = require('../utils/wrapAsync'); // Custom utility function for async error handling
const ExpressError = require('../utils/ExpressError'); // Error handling middleware
const Review = require('../models/review'); // Adjust the path as necessary
const Listing = require('../models/listing'); // Adjust the path as necessary
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js'); // Adjust the path as necessary

const reviewController = require('../controllers/reviews'); // Adjust the path as necessary
const review = require('../models/review');


//Reviews part
//post route for reviews
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//delete route for reviews
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destoryReview));

module.exports = router;