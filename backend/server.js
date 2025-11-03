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
const io = new Server(server, { cors: { origin: '*' } });

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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

server.listen(5001, () => console.log('Server running on port 5001'));