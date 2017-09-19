const express       = require("express");
const authRoutes    = express.Router();
const bcrypt        = require("bcrypt");
const bcryptSalt    = 10;
const passport      = require('passport');
const User          = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;



//THE FACEBOOK LOGIN
authRoutes.get('/facebook', passport.authenticate('facebook', {scope:"email"}));
authRoutes.get('/facebook/callback', passport.authenticate('facebook',
{ successRedirect: '/preferences', failureRedirect: '/login' }));

//GET TO THE LOGIN PAGE
authRoutes.get("/login", (req, res, next) => {
  res.render("login");
});

//DO THE LOGIN
authRoutes.post('/login', passport.authenticate('local-login',
{ successRedirect: '/user', failureRedirect: '/login' }));


module.exports = authRoutes;
