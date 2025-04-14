const express = require('express');
const router = express.Router({ mergeParams: true }); // Merge params from parent route
const wrapAsync = require('../utils/wrapAsync'); // Custom utility function for async error handling
const { listingSchema } = require('../schema.js'); // Adjust the path as necessary
const ExpressError = require('../utils/ExpressError'); // Error handling middleware
const Listing = require('../models/listing'); // Adjust the path as necessary


const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg); // Custom error handling
    } else {
        next(); // Proceed to the next middleware or route handler
    }
};


//index route
router.get('/', wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
}));

//New route
router.get("/new", (req, res) => {
    res.render("./listings/new.ejs");
});


//Show route
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate('reviews').exec(); // Populate the reviews field with review data
    res.render("./listings/show.ejs", { listing });
}));

//Create route
router.post("/", validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash('success', 'Your listing is being added!');
    res.redirect("/listings");
}));


//Edit route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing });
}));

//Update route
router.put("/:id",validateListing, wrapAsync(async (req, res) => {
    if (!req.body.listing) throw new ExpressError(400, 'Invalid Listing Data!'); // we can use next(new ExpressError(400, 'Invalid Listing Data!'));
    // console.log(req.body.listing);
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    res.redirect(`/listings/${id}`);
}));

//Delete route
router.delete("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    let deletelisting = await Listing.findByIdAndDelete(id);
    console.log(deletelisting);
    res.redirect("/listings");
}));

module.exports = router; 