require('dotenv').config(); // Make sure to load the environment variables
const jwt = require('jsonwebtoken');

// User data (replace with your actual user data)
const user = {
  _id: '6679bc3da1bad8f705acb85b',
  userId: 'initialAdmin',
  email: 'codewithayush45@gmail.com',
  isAdmin: true
};

// Secret key from environment variables
const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

// Generate a token
const token = jwt.sign({ id: user._id, userId: user.userId, email: user.email, isAdmin: user.isAdmin }, secretKey, { expiresIn: '1h' });

console.log('Generated Token:', token);
