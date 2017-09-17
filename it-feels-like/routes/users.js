const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport   = require('passport');

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

  User.findOne({ email }, "email", (err, email) => {
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

router.get('/:id', function(req, res, next) {

});

module.exports = router;
