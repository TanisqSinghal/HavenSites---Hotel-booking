if(process.env.NODE_ENV != "production") {
    require('dotenv').config(); // Load environment variables from .env file}
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate'); // EJS template engine for Express
const ExpressError = require('./utils/ExpressError'); // Error handling middleware
const session = require('express-session'); // Session middleware for Express
const flash = require('connect-flash'); // Flash messages middleware
const passport = require('passport'); // Authentication middleware
const localStrategy = require('passport-local'); // Local authentication strategy

const User = require('./models/user'); // User model for authentication

const listingRouter = require('./routes/listing.js'); // Adjust the path as necessary
const reviewRouter = require('./routes/review.js'); // Adjust the path as necessary
const userRouter = require('./routes/user.js'); // Adjust the path as necessary

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

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
}

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.use(session(sessionOptions)); // Initialize session middleware
app.use(flash()); // Initialize flash middleware

app.use(passport.initialize()); // Initialize passport middleware
app.use(passport.session()); // Use session for passport authentication
passport.use(new localStrategy(User.authenticate())); // Use local strategy for authentication


passport.serializeUser(User.serializeUser()); // Serialize user for session
passport.deserializeUser(User.deserializeUser()); // Deserialize user from session

app.use((req, res, next) => {
    res.locals.success = req.flash('success'); // Flash success messages
    res.locals.error = req.flash('error'); // Flash error messages
    res.locals.currUser = req.user; // Current user for templates
    next(); // Proceed to the next middleware or route handler
});

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "student",
//     })
//     const registeredUser = await User.register(fakeUser, "student123"); // Register a new user with the username and password
//     res.send(registeredUser); // Send the registered user as a response
// })

app.use('/listings', listingRouter); // Use the listings router for all routes starting with /listings
app.use('/listings/:id/reviews', reviewRouter);
app.use("/", userRouter)

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


