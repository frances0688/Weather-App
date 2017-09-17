const express    = require("express");
const authRoutes = express.Router();
const bcrypt     = require("bcrypt");
const bcryptSalt = 10;
const passport   = require('passport');
const User = require('../models/user');

//THE FACEBOOK LOGIN
authRoutes.get("/facebook", passport.authenticate("facebook"));
authRoutes.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/welcome",
  failureRedirect: "/error"
}));

// //GET TO THE SIGN UP PAGE
// authRoutes.get("/signup", (req, res, next) => {
//   res.render("signup");
// });
//
// //DO THE SIGN UP AND SAVE TO DB
// authRoutes.post("/signup", (req, res, next) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const password = req.body.password;
//
//   if (name === "" || password === "" || email === "") {
//     res.render("signup", { message: "Fill in all the fields" });
//     return;
//   }
//
//   User.findOne({ email }, "email", (err, email) => {
//     if (email !== null) {
//       res.render("signup", { message: "The email already exists" });
//       return;
//     }
//
//     const salt = bcrypt.genSaltSync(bcryptSalt);
//     const hashPass = bcrypt.hashSync(password, salt);
//
//     const newUser = new User({
//       name,
//       email,
//       password: hashPass
//     });
//
//     newUser.save((err) => {
//       if (err) {
//         res.render("signup", { message: "Something went wrong" });
//       } else {
//         res.redirect("login");
//       }
//     });
//   });
// });
//
// //GET TO THE LOGIN PAGE
// authRoutes.get("/login", (req, res, next) => {
//   res.render("login");
// });
//
// //DO THE LOGIN
// authRoutes.post("/login", passport.authenticate("local", {
//   successRedirect: "/welcome",
//   failureRedirect: "/login",
//   failureFlash: true,
//   passReqToCallback: true
// }));
//
//
//



module.exports = authRoutes;
