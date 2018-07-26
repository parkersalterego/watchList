const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'generalUser'
    },
    secStamp: String,
    refreshToken: String,
    is_deleted: {
        type: Boolean,
        default: false
    }
});

UserSchema.path('email').validate((email) => {
    let emailRegex = /^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}, 'Please input a valid email address');

const User = module.exports = mongoose.model('User', UserSchema);