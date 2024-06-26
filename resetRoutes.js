const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const { resetState, resetElo } = require('../controllers/resetController');

router.post('/elo', adminAuth, resetElo);
router.post('/', auth, resetState);

module.exports = router;
