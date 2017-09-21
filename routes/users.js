const express = require('express');
const router = express.Router();
var expressValidator = require('express-validator');
router.use(expressValidator());
const User = require('../models/user');
const Preferences = require('../models/preferences');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require('passport');


//SAVE PREFERENCES TO DB
router.post("/preferences", (req, res, next) => {
  const hotTemp = req.body.hot;
  const idealTemp = req.body.ideal;
  const coldTemp = req.body.cold;
  const sun = req.body.sun;
  const rain = req.body.rain;
  const clouds = req.body.clouds;
  const snow = req.body.snow;
  const wind = req.body.wind;
  const degree = req.body.degree;


  const currentUserId = req.session.passport.user;
  const newPreferences =  new Preferences({
    hotTemp,
    idealTemp,
    coldTemp,
    sun,
    rain,
    clouds,
    snow,
    wind,
    degree

  });

  // Update user object with attached preferences
  User.findByIdAndUpdate(currentUserId, {
    $set: {preferences : newPreferences}}, (err, userFound) => {
      if (err) {
        return next(err);
      }
      console.log(userFound);
      res.redirect('/user');
    });

});

module.exports = router;
