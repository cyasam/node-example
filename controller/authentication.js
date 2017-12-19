const User = require('../models/users');

const auth = {
    signup: function(req,res,next){
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password){
            res.status(422).send({ error: 'provide email and password.'});
        }

        const query = User.findOne({ email })
        const promise = query.exec();

        promise.then(function(findingEmail){

            if(findingEmail) { 
                return res.status(422).send({ error: 'Email is in use'});
            }

            const user = new User({
                email,
                password
            });
            
            user.save(function(err){
                if(err) { return next(err); }

                res.send({ success: true });
            });

        }).catch(function(err){
            return next(err);
        });
    },
    login: function(req,res,next){
        const email = req.body.email;
        const password = req.body.password;

        const query = User.findOne({email,password});
        const promise = query.exec();

        promise.then(function(findingUser){
            if(!findingUser) {
                return res.status(401).send({ success: false });
            }
            
            res.send({ success: true });

        }).catch(function(err){
            return next(err);
        });
    }
}

module.exports = auth;