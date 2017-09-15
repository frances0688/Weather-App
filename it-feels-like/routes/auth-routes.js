const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

app.get('/facebook',
  passport.authenticate('facebook'));

app.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/welcome' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = authRoutes;
