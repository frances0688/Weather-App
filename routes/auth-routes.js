const express       = require("express");
const authRoutes    = express.Router();
const bcrypt        = require("bcrypt");
const bcryptSalt    = 10;
const passport      = require('passport');
const User          = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const flash = require("connect-flash");


//THE FACEBOOK LOGIN
authRoutes.get('/facebook', passport.authenticate('facebook', {scope:"email"}));
authRoutes.get('/facebook/callback', passport.authenticate('facebook',
{ successRedirect: '/preferences', failureRedirect: '/login' }));


const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
};
//Get User Page
authRoutes.get('/user', isAuthenticated, function(req, res){
  res.render('user', { user: req.user });
});

function test(req, res, next) {
  console.log('test');
  next();
}

// Get login page
// authRoutes.get('/login', function(req, res, next) {
//   res.render('login');
// });

// Login Post
authRoutes.post('/login', test, passport.authenticate('local-login', {
  successRedirect: '/user',
  failureRedirect: '/',
}));

// Get signUp page
authRoutes.get('/signup', function(req, res){
  res.render('signup');
});

// SignUp Post
authRoutes.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/preferences',
  failureRedirect: '/signup'
}));

// Handle Logout
authRoutes.get('/signout', function(req, res) {
req.logout();
res.redirect('/');
});

module.exports = authRoutes;
