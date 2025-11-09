const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });  // Temporarily keep '*' for testing; update to your frontend URL later

// Updated: Remove deprecated Mongoose options
mongoose.connect(process.env.MONGO_URI);

// Optional: Add a connection check for debugging
mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Socket.IO for real-time
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Join a room (e.g., chat room)
  socket.on('joinRoom', (room) => socket.join(room));
  
  // Handle sending messages
  socket.on('sendMessage', (data) => {
    io.to(data.room).emit('receiveMessage', data);
  });
  
  // Online status (broadcast to all)
  socket.on('userOnline', (userId) => {
    socket.broadcast.emit('userStatus', { userId, status: 'online' });
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Updated: Use process.env.PORT for production
server.listen(process.env.PORT || 5001, () => console.log(`Server running on port ${process.env.PORT || 5001}`));