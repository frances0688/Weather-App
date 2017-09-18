const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Preferences = require('../models/preferences');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require('passport');
const $ = require('jQuery');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//GET TO THE SIGN UP PAGE
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

//DO THE SIGN UP AND SAVE TO DB
router.post("/signup", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (name === "" || password === "" || email === "") {
    res.render("signup", { message: "Fill in all the fields" });
    return;
  }

  User.findOne({}, (err, email) => {
    if (email !== null) {
      res.render("signup", { message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("signup", { message: "Something went wrong" });
      } else {
        res.redirect("login");
      }
    });
  });
});

//SAVE PREFERENCES TO DB
router.post("/preferences", (req, res, next) => {
  const hotTemp = req.body.hot;
  const idealTemp = req.body.cold;
  const coldTemp = req.body.ideal;

  // const sun = document.querySelector('input[name="sun"]:checked').value;
  const sun = $('input[name="sun"]:checked').val();



  const newPreferences =  new Preferences({
    hotTemp,
    idealTemp,
    coldTemp,
    sun
  });

  newPreferences.save((err) => {
    if (err) {
      res.render("preferences", { message: "Something went wrong" });
    } else {
      res.redirect("user");
    }
  });

});

module.exports = router;
