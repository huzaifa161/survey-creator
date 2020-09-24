const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

require('dotenv').config()

const bcrypt = require('bcrypt');
bcrypt.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
    updatedAt: Date,
    Surveys: {
        type: ObjectId,
        ref:'Survey'
    }
});

UserSchema.methods.encryptPassword = function (password) {
    let hashed_password;
    bcrypt.hash(password, process.env.SALT, function (err, hash) {
        hashed_password = hash;
    });
    return hashed_password; 
};

UserSchema.pre('save', function () {
    this.password = this.encryptPassword(this.password); 
});
UserSchema.methods.authenticate = function (password) {
    return this.encryptPassword(password) === this.password;
}
module.exports = mongoose.model('User', UserSchema);