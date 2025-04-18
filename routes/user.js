const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user'); // User model for authentication
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');

const userController = require('../controllers/users'); // Import user controller

router.get('/signup', userController.renderSignup); // Route to render the signup page);

router.post('/signup', wrapAsync(userController.signUp)); // Route to handle user signup

router.get('/login', userController.renderLogin); // Route to render the login page

router.post('/login', saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.logIn); // Route to handle user login

router.get('/logout', userController.logOut); // Route to handle user logout

module.exports = router;