const express         = require('express');
const path            = require('path');
const favicon         = require('serve-favicon');
const logger          = require('morgan');
const cookieParser    = require('cookie-parser');
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');
const expressLayouts  = require('express-ejs-layouts');
const passport        = require('passport');
const LocalStrategy   = require('passport-local').Strategy;
const FbStrategy      = require('passport-facebook').Strategy;
const bcrypt          = require('bcrypt');
const session         = require('express-session');
const MongoStore      = require('connect-mongo')(session);
const configPassport  = require('./config/passport');
const User            = require('./models/user');

const app = express();

mongoose.connect("mongodb://localhost/it-feels-like", {useMongoClient: true });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
app.use(expressLayouts);


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

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const authRoutes = require("./routes/auth-routes");
const index = require('./routes/index');
const users = require('./routes/users');

app.use('/', index);
app.use('/', users);
app.use('/', authRoutes);



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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
