const express = require('express');
const router = express.Router();
var expressValidator = require('express-validator');
router.use(expressValidator());
const User = require('../models/user');
const Preferences = require('../models/preferences');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require('passport');



// //GET TO THE SIGN UP PAGE
// router.get("/signup", (req, res, next) => {
//   res.render("signup");
// });

// //DO THE SIGN UP AND SAVE TO DB
// router.post("/signup", (req, res, next) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const password = req.body.password;
//   const password2 = req.body.password2;

//   // Validation
//   req.checkBody('name', { message:'Name is required'}).notEmpty(),
//   req.checkBody('email', { message:'Email is required'}).notEmpty(),
//   req.checkBody('email', { message:'Email is not valid'}).isEmail(),
//   req.checkBody('password', { message:'Password is required'}).notEmpty(),
//   req.checkBody('password2', { message:'Passwords do not match'}).equals(req.body.password),

//   errors = req.validationErrors();

//   if (errors){
//     res.render ('signup',{
//         errors: errors
//     });
//   }else {
//     console.log('Passed')
//   }

//   User.findOne({email}, (err, user) => {
//     if (user !== null) {
//       res.render("signup", { message: "The email already exists" });
//       return;
//     }

//     const salt = bcrypt.genSaltSync(bcryptSalt);
//     const hashPass = bcrypt.hashSync(password, salt);

//     const newUser = new User({
//       name,
//       email,
//       password: hashPass
//     });

//     newUser.save(function(error) {
//       if (error) {
//             res.render("signup", { message: "Something went wrong" });
//       } else {
//           User.find({}).populate('preferences')
//           res.redirect("preferences")
//         }
//     });
//   });
// });

//SAVE PREFERENCES TO DB
router.post("/preferences", (req, res, next) => {
  const hotTemp = req.body.hot;
  const idealTemp = req.body.cold;
  const coldTemp = req.body.ideal;
  const sun = req.body.sun;
  const rain = req.body.rain;
  const clouds = req.body.clouds;
  const snow = req.body.snow;
  const wind = req.body.wind;


  const currentUserId = req.session.passport.user;
  const newPreferences =  new Preferences({
    hotTemp,
    idealTemp,
    coldTemp,
    sun,
    rain,
    clouds,
    snow,
    wind

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
