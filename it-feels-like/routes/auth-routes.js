const express    = require("express");
const authRoutes = express.Router();
const bcrypt     = require("bcrypt");
const bcryptSalt = 10;
const passport   = require('passport');

//THE FACEBOOK LOGIN
authRoutes.get("/facebook", passport.authenticate("facebook"));
authRoutes.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/user",
  failureRedirect: "/error"
}));

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
