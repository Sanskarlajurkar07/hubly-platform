const { verifyToken } = require('../config/jwt');

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        error: 'Access denied. No token provided.' 
      });
    }

    const verified = verifyToken(token);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(403).json({ 
      error: 'Invalid or expired token' 
    });
  }
};

module.exports = authenticateToken;