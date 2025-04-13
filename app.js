const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing'); // Adjust the path as necessary
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate'); // EJS template engine for Express
const wrapAsync = require('./utils/wrapAsync'); // Custom utility function for async error handling
const ExpressError = require('./utils/ExpressError'); // Error handling middleware
const { listingSchema } = require('./schema.js'); // Adjust the path as necessary
const Review = require('./models/review'); // Adjust the path as necessary


const MONGO_URL = 'mongodb://localhost:27017/HavenSites';

main()
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('MongoDB connection error:', err);
    });


async function main() {
    await mongoose.connect(MONGO_URL);
}


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.json()); // Middleware to parse JSON bodies
app.use(methodOverride('_method')); // Middleware to support PUT and DELETE requests
app.use(express.static(path.join(__dirname, 'public'))); // Middleware to serve static files
app.engine('ejs', ejsMate); // Use ejsMate for EJS template engine

app.get('/', (req, res) => {
    res.send('Hello World!');
});

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
app.get('/listings', wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
}));

//New route
app.get("/listings/new", (req, res) => {
    res.render("./listings/new.ejs");
});


//Show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", { listing });
}));

//Create route
app.post("/listings", validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));


//Edit route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing });
}));

//Update route
app.put("/listings/:id",validateListing, wrapAsync(async (req, res) => {
    if (!req.body.listing) throw new ExpressError(400, 'Invalid Listing Data!'); // we can use next(new ExpressError(400, 'Invalid Listing Data!'));
    // console.log(req.body.listing);
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    res.redirect(`/listings/${id}`);
}));

//Delete route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    let deletelisting = await Listing.findByIdAndDelete(id);
    console.log(deletelisting);
    res.redirect("/listings");
}));

//Reviews part

//post route for reviews
app.post("/listings/:id/reviews", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${id}`);
}));



app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went wrong!' } = err;
    if (err instanceof ExpressError) {
        message = err.message;
        statusCode = err.statusCode;
    }
    res.status(statusCode).render('error.ejs', { err });
    // res.status(statusCode).send(message);
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});


