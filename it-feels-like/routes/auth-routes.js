const express    = require("express");
const authRoutes = express.Router();
const bcrypt     = require("bcrypt");
const bcryptSalt = 10;
const passport   = require('passport');
const User = require("../models/user");

//THE FACEBOOK LOGIN
authRoutes.get('/facebook', passport.authenticate('facebook', {scope:"email"}));
authRoutes.get('/facebook/callback', passport.authenticate('facebook', 
{ successRedirect: '/user', failureRedirect: '/login' }));

//GET TO THE LOGIN PAGE
authRoutes.get("/login", (req, res, next) => {
  res.render("login");
});

//DO THE LOGIN
authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/user",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));





module.exports = authRoutes;
