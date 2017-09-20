var express = require('express');
var router = express.Router();

const isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
};

/* GET TO ALL THE PAGES*/
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/welcome', function(req, res, next) {
  res.render('welcome');
});

router.get('/user:id', function(req, res, next) {
  const userId = req.params.id;

  User.findById(userId, (err, user) => {
  if (err) { return next(err); }
  res.render('user', {user});
  });

});

router.get('/preferences',  isAuthenticated, function(req, res, next) {
  res.render('preferences');
});

module.exports = router;
