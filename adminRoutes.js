const express = require('express');
const router = express.Router();
const { getPendingRequests, approveRequest, denyRequest, resetElo, getUsers, getAnalytics } = require('../controllers/adminController');
const auth = require('../middleware/auth'); // Assuming you have an auth middleware

// Define the routes
router.get('/pending-requests', auth, getPendingRequests);
router.post('/approve-request', auth, approveRequest);
router.post('/deny-request', auth, denyRequest);
router.post('/reset-elo', auth, resetElo);
router.get('/users', auth, getUsers);
router.get('/analytics', auth, getAnalytics);

module.exports = router;
