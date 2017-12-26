const User = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config');

const authHelpers = {
    createToken: function(user){
        const timestamp = new Date().getTime();
        console.log(timestamp);
        return jwt.sign({ sub: user.id }, config.secret, { expiresIn: 60 * 60 } );
    }
};

const auth = {
    signup: function(req,res,next){
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password){
            res.status(422).send({ error: 'provide email and password.'});
        }

        const query = User.findOne({ email })
        const promise = query.exec();

        promise.then(findingEmail => {

            if(findingEmail) { 
                return res.status(422).send({ error: 'Email is in use'});
            }

            const user = new User({
                email,
                password
            });
            
            user.save(err => {
                if(err) { return next(err); }

                res.send({ token: authHelpers.createToken(user) });
            });

        }).catch(err => {
            return next(err);
        });
    },
    login: function(req,res,next){
        return res.send({ token: authHelpers.createToken(req.user)});
    }
}

module.exports = auth;