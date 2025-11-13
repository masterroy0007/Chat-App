const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store for testing
const users = [
  { id: '1', username: 'user1', email: 'user1@example.com', password: '$2a$10$8K1p/a0dURXAm7QiTRqNa.E3YPWs8UkrpC7F86G/4oVlVJ5HZh0vO', isOnline: false },
  { id: '2', username: 'user2', email: 'user2@example.com', password: '$2a$10$8K1p/a0dURXAm7QiTRqNa.E3YPWs8UkrpC7F86G/4oVlVJ5HZh0vO', isOnline: false }
];

const conversations = [];
const messages = [];

// Helper function to generate ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper function to find user by email and password
const findUser = (email, password) => users.find(u => u.email === email && u.password === password);

// Helper function to find user by ID
const findUserById = (id) => users.find(u => u.id === id);

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/conversations', require('./routes/conversations'));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join user to room
  socket.on('user:join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
    
    // Update user status to online
    const user = findUserById(userId);
    if (user) {
      user.isOnline = true;
      // Notify all clients about status change
      io.emit('user:status', { userId, isOnline: true });
    }
  });

  // Handle sending messages
  socket.on('message:send', (data) => {
    console.log('Message sent:', data);
    
    // Create message object
    const message = {
      id: generateId(),
      conversationId: data.conversationId || generateId(),
      sender: data.senderId,
      receiver: data.receiverId,
      content: data.content,
      isRead: false,
      createdAt: new Date()
    };
    
    // Add to messages array
    messages.push(message);
    
    // Emit to recipient
    socket.to(data.receiverId).emit('message:new', message);
  });

  // Handle typing indicators
  socket.on('typing:start', (data) => {
    socket.to(data.receiverId).emit('typing:start', data);
  });

  socket.on('typing:stop', (data) => {
    socket.to(data.receiverId).emit('typing:stop', data);
  });

  // Handle message read receipts
  socket.on('message:read', (data) => {
    const message = messages.find(m => m.id === data.messageId);
    if (message) {
      message.isRead = true;
      message.readAt = new Date();
      socket.to(data.senderId).emit('message:read', message);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});