const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user'); // User model for authentication
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');

const userController = require('../controllers/users'); // Import user controller

router
    .route("/signup")
    .get(userController.renderSignup) // Route to render the signup page
    .post(wrapAsync(userController.signUp)); // Route to handle user signup

router
    .route("/login")
    .get(userController.renderLogin) // Route to render the login page
    .post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.logIn); // Route to handle user login

router.get('/logout', userController.logOut); // Route to handle user logout

module.exports = router;