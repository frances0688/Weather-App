const express = require('express');
const router = express.Router();
var expressValidator = require('express-validator');
router.use(expressValidator())
const User = require('../models/user');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require('passport');

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
  const password2 = req.body.password2;
  
  // Validation
  req.checkBody('name', { message:'Name is required'}).notEmpty(),
    req.checkBody('email', { message:'Email is required'}).notEmpty(),
  // req.checkBody('email', { message:'Email is not valid'}).isEmail(),
  req.checkBody('password', { message:'Password is required'}).notEmpty(),
  req.checkBody('password2', { message:'Passwords do not match'}).equals(req.body.password),

  errors = req.validationErrors();

  if (errors){
    res.render ('signup',{
        errors: errors
    });
  }else {
    console.log('Passed')
  }

  User.findOne({email}, (err, foo) => {
    if (foo !== null) {
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
        res.redirect("preferences");
      }
    });
  })
})


module.exports = router;


