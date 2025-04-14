const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user'); // User model for authentication
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');


router.get('/signup', (req, res) => {
    res.render("users/signup.ejs"); // Render the registration page
});

router.post('/signup', wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body; // Extract username, email, and password from the request body
        const newUser = new User({ username, email }); // Create a new user object
        const registeredUser = await User.register(newUser, password); // Register the user with the provided password
        console.log(registeredUser); // Log the registered user object
        req.flash('success', `Welcome to HavenSites ${username} !`); // Flash a success message
        // req.login(registeredUser, (err) => { // Log in the user after registration
        //     if (err) return next(err); // Handle any errors during login
        //     req.flash('success', 'Welcome to YelpCamp!'); // Flash a success message
        //     res.redirect('/listings'); // Redirect to the listings page
        // });
        // req.flash('error', e.message); // Flash an error message if registration fails
        res.redirect('/listings'); // Redirect back to the signup page
    } catch (e) {
        req.flash('error', e.message); // Flash an error message if registration fails
        res.redirect('/signup'); // Redirect back to the signup page
    }
}));

router.get('/login', (req, res) => {
    res.render("users/login.ejs"); // Render the login page
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), async (req, res, next) => {
    req.flash('success', 'Welcome back!'); // Flash a success message
    const redirectUrl = req.session.returnTo || '/listings'; // Redirect URL after login});
    res.redirect("/listings"); // Redirect to the listings page
});
module.exports = router;