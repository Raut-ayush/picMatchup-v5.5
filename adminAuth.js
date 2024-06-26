const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

const adminAuth = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        console.log('Authorization token required');
        return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (user) {
            console.log(`User found: ${user.email}, Admin: ${user.isAdmin}`);
        } else {
            console.log('User not found');
        }
        if (user && user.isAdmin) {
            req.user = user;
            next();
        } else {
            console.log('Access denied: Not an admin');
            return res.status(403).json({ message: 'Access denied' });
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = adminAuth;
