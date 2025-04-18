const express = require('express');
const router = express.Router({ mergeParams: true }); // Merge params from parent route
const wrapAsync = require('../utils/wrapAsync'); // Custom utility function for async error handling
const ExpressError = require('../utils/ExpressError'); // Error handling middleware
const Listing = require('../models/listing'); // Adjust the path as necessary
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');

const listingController = require('../controllers/listings'); // Adjust the path as necessary
//index route
router.get('/', wrapAsync(listingController.index)); // Use the index method from the controller

//New route
router.get("/new", isLoggedIn, listingController.renderNewForm); // Use the renderNewForm method from the controller);


//Show route
router.get("/:id", wrapAsync(listingController.showListing)); // Use the showListing method from the controller

//Create route
router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing)); // Use the createListing method from the controller


//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm)); // Use the renderEditForm method from the controller

//Update route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing)); // Use the updateListing method from the controller

//Delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); // Use the deleteListing method from the controller

module.exports = router; 