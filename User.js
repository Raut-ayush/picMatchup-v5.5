// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    yearOfBirth: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    image: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationCode: { type: String },
    isAdmin: { type: Boolean, default: false },
    isAdminRequest: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
