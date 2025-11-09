const express = require('express');
const jwt = require('jsonwebtoken');
const Message = require('../models/Message');
const router = express.Router();

// JWT Middleware
const verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "No token provided" });

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    req.user = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get messages
router.get('/:receiverId', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.receiverId },
        { sender: req.params.receiverId, receiver: req.user.id }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Send message
router.post('/', verifyToken, async (req, res) => {
  try {
    const { receiver, content } = req.body;

    if (!receiver || !content)
      return res.status(400).json({ message: 'receiver and content required' });

    const message = new Message({
      sender: req.user.id,
      receiver,
      content
    });

    await message.save();

    res.status(201).json(message);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
