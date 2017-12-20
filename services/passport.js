const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const User = require('../models/users');
const config = require('../config');

const localOptions = {
    usernameField: 'email'
}
const localStrategy = new LocalStrategy(localOptions, function (email, password, done) {
    User.findOne({ email }, (err, user) => {
        if(err) { return done(err); }

        if(!user) { return done(null,false); }

        user.comparePassword(password, function(err, isMatch){
            if(err) { return done(err); }

            if(!isMatch) { return done(null, false); }

            return done(null, user)
        });
    })
})

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
}

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done){
    User.findById(payload.sub, (err, user) => {
        if(err) { return done(err); }

        if(!user) { return done(null,false); }

        return done(null, user);
    });
});

passport.use(localStrategy);
passport.use(jwtStrategy);