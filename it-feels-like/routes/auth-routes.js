const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get("/facebook", passport.authenticate("facebook"));
authRoutes.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/user",
  failureRedirect: "/welcome"
}));

module.exports = authRoutes;
