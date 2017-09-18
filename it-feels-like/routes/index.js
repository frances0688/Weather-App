var express = require('express');
var router = express.Router();

/* GET TO ALL THE PAGES*/
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/welcome', function(req, res, next) {
  res.render('welcome');
});

router.get('/user', function(req, res, next) {
  console.log("session",req.session);
  res.render('user');
});

router.get('/preferences', function(req, res, next) {
  res.render('preferences');
});







module.exports = router;
