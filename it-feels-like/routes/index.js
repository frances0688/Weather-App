var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("index");
  res.render('index');
});

router.get('/welcome', function(req, res, next) {

  res.render('welcome');
});

router.get('/signup', function(req, res, next) {

  res.render('signup');
});

router.get('/user', function(req, res, next) {

  res.render('user');
});



module.exports = router;
