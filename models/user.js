
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Yoy must enter a name']
    },
    email: {
        type: String,
        required: [true, 'Yoy must enter an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Yoy must enter a password']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


module.exports = model( 'User', UserSchema );