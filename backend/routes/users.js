const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get all users except the logged-in user
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query; // passed via query
    const users = await User.find({ _id: { $ne: userId } }).select('username email');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

module.exports = router;
