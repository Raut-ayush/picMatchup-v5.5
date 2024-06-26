// authController.js
const authService = require('../services/authService');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const newUser = await authService.registerUser(req.body, req.file);
        res.status(201).send('User registered. Verification email sent.');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { token } = await authService.loginUser(req.body.login, req.body.password);
        res.json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const result = await authService.verifyEmail(req.body.email, req.body.verificationCode);
        res.status(200).send(result.message);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const result = await authService.resetPassword(req.body.email, req.body.newPassword);
        res.status(200).send(result.message);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ isAdmin: user.isAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user details' });
    }
};
