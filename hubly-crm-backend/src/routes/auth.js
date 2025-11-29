const express = require('express');
const router = express.Router();
const { registerAdmin, loginUser, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', registerAdmin);
router.post('/login', loginUser);
router.put('/password', protect, changePassword);

module.exports = router;