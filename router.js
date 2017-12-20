const Authentication = require('./controller/authentication');
const homePage = require('./controller/home-page');
const passport = require('passport');
const passportServices = require('./services/passport');

const passLocal = passport.authenticate('local', { session: false });
const passJwt = passport.authenticate('jwt', { session: false });

const router = {
    init: function(app){
        app.get('/', passJwt, homePage);
        app.post('/signup', Authentication.signup);
        app.post('/login', passLocal, Authentication.login);
    }
};

module.exports = router;