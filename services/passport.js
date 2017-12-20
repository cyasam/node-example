const passport = require('passport');
const User = require('../models/users');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create Local Strategy

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    const query = User.findOne({email});
    const promise = query.exec();

    promise.then(user => {
        if(!user) {
            return done(null, false);
        }
        
        user.comparePassword(password, (err, isMatch) => {
            if(err) { return done(err, false); }
            if(!isMatch) { return done(null, false); }

            return done(null, user);
        });

    }).catch(err => {
        return done(err, false);
    });
});

// Setup options fro JWT Strategy

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT Strategy

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // See if the user id in the payload exist in out database

    User.findById(payload.sub, (err, user) => {
        if(err) { done(err, false); }

        if(!user) { done (null, false); }

        done(null, user);
    });
});

// Tell passport to use this strategy

passport.use(jwtLogin);
passport.use(localLogin);