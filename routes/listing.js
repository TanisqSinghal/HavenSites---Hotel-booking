const express = require('express');
const router = express.Router({ mergeParams: true }); // Merge params from parent route
const wrapAsync = require('../utils/wrapAsync'); // Custom utility function for async error handling
const ExpressError = require('../utils/ExpressError'); // Error handling middleware
const Listing = require('../models/listing'); // Adjust the path as necessary
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');


//index route
router.get('/', wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
}));

//New route
router.get("/new", isLoggedIn, (req, res) => {
    res.render("./listings/new.ejs");
});


//Show route
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({path: 'reviews', populate: { path: "author" }} ).populate("owner").exec(); // Populate the reviews field with review data
    if (!listing) {
        req.flash('error', 'Listing you requested does not exist!');
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });
}));

//Create route
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {
    if (!req.isAuthenticated()) {
        throw new ExpressError(401, 'You must be logged in to create a listing!'); // Custom error handling
    }
    if (!req.body.listing) throw new ExpressError(400, 'Invalid Listing Data!'); // we can use next(new ExpressError(400, 'Invalid Listing Data!'));
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // Set the owner to the currently logged-in user
    await newListing.save();
    req.flash('success', 'Your listing is being added!');
    res.redirect("/listings");
}));


//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing you requested does not exist!');
        return res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { listing });
}));

//Update route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
    // console.log(req.body.listing);
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    req.flash('success', 'Your listing is being updated!');
    res.redirect(`/listings/${id}`);
}));

//Delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    let deletelisting = await Listing.findByIdAndDelete(id);
    // console.log(deletelisting);
    req.flash('success', 'Your listing is deleted!');
    res.redirect("/listings");
}));

module.exports = router; 