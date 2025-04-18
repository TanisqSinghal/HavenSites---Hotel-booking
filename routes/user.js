const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user'); // User model for authentication
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');


router.get('/signup', (req, res) => {
    res.render("users/signup.ejs"); // Render the registration page
});

router.post('/signup', wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body; // Extract username, email, and password from the request body
        const newUser = new User({ username, email }); // Create a new user object
        const registeredUser = await User.register(newUser, password); // Register the user with the provided password
        // console.log(registeredUser); // Log the registered user object
        req.login(registeredUser, (err) => { // Log in the user after registration
            if (err) return next(err); // Handle any errors during login
            req.flash('success', `Welcome to HavenSites ${username} !`); // Flash a success message
            res.redirect('/listings'); // Redirect to the listings page after successful registration
        });
    } catch (e) {
        req.flash('error', e.message); // Flash an error message if registration fails
        res.redirect('/signup'); // Redirect back to the signup page
    }
}));

router.get('/login', (req, res) => {
    res.render("users/login.ejs"); // Render the login page
});

router.post('/login', saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), async (req, res, next) => {
    req.flash('success', 'Welcome back!'); // Flash a success message
    const redirectUrl = res.locals.redirectUrl || '/listings'; // Redirect URL after login});
    res.redirect(redirectUrl); // Redirect to the listings page
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); } // Handle any errors during logout
        req.flash('success', 'logged out successfully!'); // Flash a success message
        res.redirect('/listings'); // Redirect to the listings page after logout
    });
});

module.exports = router;