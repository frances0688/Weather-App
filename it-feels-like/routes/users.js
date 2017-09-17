var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post('/', function(req, res, next) {
//   const newUser = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//     });
//
//   newUser.save ( (err, user)=> {
//     if (err) {next(err);}
//     else{
//       res.redirect('/'+ user.id);
//     }
//   })
// })
//
// router.get('/:id', function(req, res, next) {
//
// })

module.exports = router;
