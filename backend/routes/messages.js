const express = require('express');
const jwt = require('jsonwebtoken');
const Message = require('../models/Message');
const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Get messages between two users
router.get('/:receiverId', verifyToken, async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.user.id, receiver: req.params.receiverId },
      { sender: req.params.receiverId, receiver: req.user.id },
    ],
  }).sort({ timestamp: 1 });
  res.json(messages);
});

// Send message
router.post('/', verifyToken, async (req, res) => {
  const { receiver, content } = req.body;
  const message = new Message({ sender: req.user.id, receiver, content });
  await message.save();
  res.status(201).json(message);
});

module.exports = router;