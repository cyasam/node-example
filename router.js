const Authentication = require('./controller/authentication');
const homePage = require('./controller/home-page');
const passportServices = require('./services/passport');
const passport = require('passport');

const passportAuthenticate = passport.authenticate('jwt',  { session: false });
const passportLogin = passport.authenticate('local', { session: false })

const router = {
    init: function(app){
        app.get('/',  passportAuthenticate, homePage);
        app.post('/signup', Authentication.signup);
        app.post('/login', passportLogin, Authentication.login);
    }
};

module.exports = router;