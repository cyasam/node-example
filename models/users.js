const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    email: { type: String, lowercase: true, unique: true },
    password: String
});

userSchema.pre('save', function(next){
    const user = this;

    bcrypt.genSalt(10, (err, salt) => {
        if(err) { return next(err); }
        
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err){ return next(err); }

            user.password = hash;
            next();
        });

    });
});

userSchema.methods.comparePassword = function(submittedPassword, callback){
    bcrypt.compare(submittedPassword, this.password, (err, isMatch) => {
        if(err) { return callback(err); }
        if(!isMatch) { return callback(null, false); }

        callback(null, isMatch);
    });
};

const UserModelClass = mongoose.model('User', userSchema);

module.exports = UserModelClass;