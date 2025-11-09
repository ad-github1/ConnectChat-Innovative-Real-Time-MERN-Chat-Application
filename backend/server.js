const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Validate ENV
if (!process.env.MONGO_URI) {
  console.error("❌ Missing MONGO_URI in .env");
  process.exit(1);
}

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
mongoose.connection.on('connected', () => console.log('✅ MongoDB connected'));
mongoose.connection.on('error', (err) => console.error('❌ MongoDB error:', err));

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// TEMP placeholder routes
app.get("/api/test", (req, res) => {
  res.send("✅ Backend API running successfully!");
});

// Serve React frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// SOCKET.IO
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL || '*' }
});

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("userJoined", (username) => {
    onlineUsers[socket.id] = username;
    io.emit("onlineUsers", Object.values(onlineUsers));
  });

  socket.on("sendMessage", (msg) => {
    io.emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    delete onlineUsers[socket.id];
    io.emit("onlineUsers", Object.values(onlineUsers));
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
