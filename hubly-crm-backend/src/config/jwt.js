const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'hubly-secret-key-change-in-production';
const JWT_EXPIRE = '24h';

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = {
  JWT_SECRET,
  JWT_EXPIRE,
  generateToken,
  verifyToken
};