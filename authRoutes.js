// routes/authRoutes.js
const express = require('express');
const multer = require('multer');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth'); // Import auth middleware

const router = express.Router();
const upload = multer({ dest: 'images/' });

router.post('/register', upload.single('image'), authController.register);
router.post('/login', authController.login);
router.post('/verify-email', authController.verifyEmail);
router.post('/reset-password', authController.resetPassword);
router.get('/me', auth, authController.getMe); // Use auth middleware here

module.exports = router;
