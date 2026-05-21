const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'benets_luxury_secret_123', {
    expiresIn: '7d' // Long access expiration to keep local Dribbble UI testing fluid
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || 'benets_luxury_refresh_secret_123', {
    expiresIn: '30d'
  });
};

module.exports = { generateToken, generateRefreshToken };
