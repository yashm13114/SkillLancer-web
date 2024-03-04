const express = require('express');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/keys');

const router = express.Router();

// Middleware to verify JWT token
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Protected route to get user dashboard
router.get('/dashboard', authenticateUser, (req, res) => {
  const { id, email } = req.user;
  res.json({ user: { id, email }, message: 'User dashboard data' });
});

module.exports = router;
