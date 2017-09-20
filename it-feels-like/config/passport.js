// config/passport.js

// load all the things we need
const express = require('express');
const authRoutes = express.Router();
const expressValidator = require('express-validator');
authRoutes.use(expressValidator());
const User = require('../models/user');
const Preferences = require('../models/preferences');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FbStrategy = require('passport-facebook').Strategy;


// expose this function to our app using module.exports
module.exports = (passport) => {

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
        User.findById(id, (err, user) => {
            if (err) { return cb(err); }
            cb(null, user);
        });
    });


    passport.use('local-login', new LocalStrategy({

        passReqToCallback : true
    },
    (email, password, next) => {
        // check in mongo if a user with username exists or not
        User.findOne({email}, (err, user) => {
            // In case of any error, return using the done method
            if (err) {
              return next(err);
            }
            // Username does not exist, log error & redirect back
            if (!user){
            return next(null, false, { message: 'User Not found.' });
            }
            // User exists but wrong password, log the error
            if (!bcrypt.compareSync(password, user.password)) {
                return next(null, false, { message: 'Incorrect password' });
            }
            // User and password both match, return user from
            // done method which will be treated like success
            return next(null, user);
            }
        );
    }));


    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true
        },
        (req, name, email, next, password, password2) => {
            User.findOne({email}, (err, user) => {
                if (err) {
                    return next(err);
                }
                if (user) {
                    return next(null, false);
                }

                name      = req.body.name;
                email     = req.body.email;
                password  = req.body.password;
                password2 = req.body.password2;

                // Validation
                // req.checkBody('name', { message:'Name is required'}).notEmpty(),
                // req.checkBody('email', { message:'Email is required'}).notEmpty(),
                // req.checkBody('email', { message:'Email is not valid'}).isEmail(),
                // req.checkBody('password', { message:'Password is required'}).notEmpty(),
                // req.checkBody('password2', { message:'Passwords do not match'}).equals(req.body.password),

                // errors = req.validationErrors();

                const salt      = bcrypt.genSaltSync(bcryptSalt);
                const hashPass  = bcrypt.hashSync(password, salt);
                const newUser   = new User({
                    name,
                    email,
                    password: hashPass
                });

                newUser.save((err) => {
                    if (err){ next(err); }
                    return next(null, newUser);
                });

            });

        }
    ));

    passport.use(new FbStrategy({
    clientID: '502415123447256',
    clientSecret: 'c79591bdbc553739f926d9c2037b591e',
    callbackURL: "/facebook/callback",
    profileFields:['id','displayName','emails']
        }, function(accessToken, refreshToken, profile, done) {
            console.log(profile);
            var me = new User({
                email:profile.emails[0].value,
                name:profile.displayName
            });

            /* save if new */
            User.findOne({email:me.email}, function(err, u) {
                if(!u) {
                    me.save(function(err, me) {
                        if(err) return done(err);
                        done(null,me);
                    });
                } else {
                    console.log(u);
                    done(null, u);
                }
            });
            }
    ));
};
