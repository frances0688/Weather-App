require("dotenv").config();
const express          = require('express');
const path             = require('path');
const favicon          = require('serve-favicon');
const logger           = require('morgan');
const cookieParser     = require('cookie-parser');
const bodyParser       = require('body-parser');
const mongoose         = require('mongoose');
const expressLayouts   = require('express-ejs-layouts');
const passport         = require('passport');
const LocalStrategy    = require('passport-local').Strategy;
const FbStrategy       = require('passport-facebook').Strategy;
const bcrypt           = require('bcrypt');
const session          = require('express-session');
const MongoStore       = require('connect-mongo')(session);
const configPassport   = require('./config/passport');
const User             = require('./models/user');
const expressValidator = require('express-validator');
const typed            = require('typed.js');

const https = require('https');

const app = express();

mongoose.connect(process.env.MONGODB_URI);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
app.use(expressLayouts);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressValidator());

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));


app.use(session({
  secret: 'spiceupyourlife',
  resave: false,
  saveUninitialized: true,
}));

configPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use( (req, res, next) => {
  if (typeof(req.user) !== "undefined"){
    res.locals.userSignedIn = true;
  } else {
    res.locals.userSignedIn = false;
  }
  next();
});


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Routes
// const passportRoutes = require('./config/passport');
const authRoutes = require("./routes/auth-routes");
const index = require('./routes/index');
const users = require('./routes/users');

app.use('/', authRoutes);
app.use('/', index);
app.use('/', users);

app.get('/weather/:lat/:long', function(req, res) {

  var domain = 'api.darksky.net';
  var apiKey = '1c83839d4af713d84a99d1f0ca8832aa';

  var path = '/forecast/' + apiKey + '/' + req.params.lat + ',' + req.params.long;
  var options = {
      hostname: domain,
      path: path,
      port: 443,
      method: 'GET'
  };

  console.log('request weather', domain, path);

  var string = '';
  var request = https.request(options, function(response){
    response.on('data', (buffer) => {
      string += buffer.toString();
    });
    response.on('end', () => {
      console.log('weather response');
      var object = JSON.parse(string);
      res.json(object);
    });

  });

  request.on('error', (error) => next(error));
  request.end();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(req.method + ' ' + req.path + ' ERROR:', err);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
