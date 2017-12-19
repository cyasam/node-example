const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, lowercase: true, unique: true },
    password: String
});

const UserModelClass = mongoose.model('User', userSchema);

module.exports = UserModelClass;