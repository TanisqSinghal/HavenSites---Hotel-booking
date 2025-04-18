const Listing = require("./models/listing");
const { listingSchema, reviewSchema } = require('./schema.js'); // Adjust the path as necessary
const ExpressError = require('./utils/ExpressError'); // Error handling middleware
const Review = require("./models/review"); // Adjust the path as necessary


module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl; // Store the original URL in the session
        // if(req.session.redirectUrl === "/edit"){
        //     req.flash('error', 'You must be logged in to edit a listing!');
        //     return res.redirect("/login");

        // }
        if (req.originalUrl.includes("/edit")) {
            req.flash('error', 'You must be logged in to edit this listing!');
        } else if (req.originalUrl.includes("DELETE")) {
            req.flash('error', 'You must be logged in to delete this listing!');
        } else if (req.originalUrl.includes("/listings/new")) {
            req.flash('error', 'You must be logged in to create a listing!');
        } else {
            req.flash('error', 'You must be logged in!');
        }
        // req.flash('error', 'You must be logged in to create or edit a listing!');
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    // console.log("Redirect URL:", req.session.redirectUrl); // Log the redirect URL for debugging
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl; // Store the original URL in the session
    } 
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash('error', 'You are not authorized to edit this listing!');
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg); // Custom error handling
    } else {
        next(); // Proceed to the next middleware or route handler
    }
};


module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(','); // how does it working? // error.details is an array of error objects, each containing a message property.
        throw new ExpressError(400, msg); // Custom error handling
    } else {
        next(); // Proceed to the next middleware or route handler
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId); // Populate the reviews field with review data
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash('error', 'You are not authorized to delete this review!');
        return res.redirect(`/listings/${id}`);
    }
    next(); // Proceed to the next middleware or route handler
};




