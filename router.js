const Authentication = require('./controller/authentication'); 

const router = {
    init: function(app){
        app.post('/signup', Authentication.signup);
        app.post('/login',  Authentication.login);
    }
};

module.exports = router;