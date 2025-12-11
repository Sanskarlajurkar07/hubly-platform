const express = require('express');
const router = express.Router();
const { registerAdmin, loginUser, changePassword, verifyToken } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', registerAdmin);
router.post('/login', loginUser);
router.put('/password', protect, changePassword);
router.get('/verify', protect, verifyToken);

module.exports = router;
