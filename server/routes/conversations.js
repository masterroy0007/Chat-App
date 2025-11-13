const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getConversations,
  getMessages,
  createConversation,
  sendMessage,
  markAsRead
} = require('../controllers/conversationsController');

// GET /conversations - Get user conversations
router.get('/', auth, getConversations);

// POST /conversations/create - Create/get conversation
router.post('/create', auth, createConversation);

// GET /conversations/:id/messages - Get conversation messages
router.get('/:id/messages', auth, getMessages);

// POST /conversations/message - Send message
router.post('/message', auth, sendMessage);

// PUT /conversations/message/read - Mark message as read
router.put('/message/read', auth, markAsRead);

module.exports = router;