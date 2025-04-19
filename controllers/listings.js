const Listing = require("../models/listing");



module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: 'reviews', populate: { path: "author" } }).populate("owner").exec(); // Populate the reviews field with review data
    if (!listing) {
        req.flash('error', 'Listing you requested does not exist!');
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {

    const location = req.body.listing.location;
    const maptiler = await import('@maptiler/sdk');
    maptiler.config.apiKey = `${mapToken}`; // Replace with your MapTiler API key

    const result = await maptiler.geocoding.forward(location,
        {
            limit: 1,
        })

    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, filename);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // Set the owner to the currently logged-in user
    newListing.image = { url, filename }; // Set the image URL to the uploaded file path
    
    newListing.geometry = result.features[0].geometry; // Set the geometry to the geocoding result
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash('success', 'Your listing is being added!');
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing you requested does not exist!');
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url; // Store the original image URL
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_150,w_250");
    res.render("./listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    // console.log(req.body.listing);
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = { url, filename }; // Set the image URL to the uploaded file path
        await updatedListing.save();
    }
    req.flash('success', 'Your listing is being updated!');
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    let deletelisting = await Listing.findByIdAndDelete(id);
    // console.log(deletelisting);
    req.flash('success', 'Your listing is deleted!');
    res.redirect("/listings");
};