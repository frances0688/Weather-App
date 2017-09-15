// config/passport.js

// load all the things we need
const LocalStrategy = require('passport-local').Strategy;

// load up the user model
const User = require('../models/user');
const bcrypt = require('bcrypt');

// expose this function to our app using module.exports
module.exports = (passport) => {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) { return cb(err); }
        cb(null, user);
    });
    });

    passport.use('local-login', new LocalStrategy((username, password, next) => {
        User.findOne({ username }, (err, user) => {
            if (err) {
            return next(err);
            }
            if (!user) {
            return next(null, false, { message: "Incorrect username" });
            }
            if (!bcrypt.compareSync(password, user.password)) {
            return next(null, false, { message: "Incorrect password" });
            }

            return next(null, user);
        });
    }));

    passport.use('local-signup', new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, next) => {
        process.nextTick(() => {
            User.findOne({
                'username': username
            }, (err, user) => {
                if (err){ return next(err); }

                if (user) {
                    return next(null, false);
                } else {
                    const { username, email, description, password } = req.body;
                    const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                    const newUser = new User({
                    username,
                    email,
                    description,
                    password: hashPass
                    });

                    newUser.save((err) => {
                        if (err){ next(err); }
                        return next(null, newUser);
                    });
                }
            });
        });
    }));


};