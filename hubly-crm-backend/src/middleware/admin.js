const User = require('../models/User');

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ 
        error: 'Access denied. Admin privileges required.' 
      });
    }

    req.adminUser = user;
    next();
  } catch (error) {
    return res.status(500).json({ 
      error: 'Server error during authorization' 
    });
  }
};

module.exports = isAdmin;