// In-memory data store for testing
const conversations = [];
const messages = [];

// Helper function to generate ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper function to find user by ID
const findUserById = (id) => {
  const users = [
    { id: '1', username: 'user1', email: 'user1@example.com', password: 'password123', isOnline: false },
    { id: '2', username: 'user2', email: 'user2@example.com', password: 'password123', isOnline: false }
  ];
  return users.find(u => u.id === id);
};

// Get conversations for a user
exports.getConversations = async (req, res) => {
  try {
    // Filter conversations for the current user
    const userConversations = conversations.filter(c => 
      c.participants.includes(req.headers.userid)
    );
    
    // Add participant details
    const conversationsWithParticipants = userConversations.map(conv => {
      return {
        ...conv,
        participants: conv.participants.map(id => findUserById(id))
      };
    });
    
    res.json(conversationsWithParticipants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get messages for a conversation
exports.getMessages = async (req, res) => {
  try {
    const conversationMessages = messages.filter(m => 
      m.conversationId === req.params.id
    );
    
    res.json(conversationMessages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create or get existing conversation
exports.createConversation = async (req, res) => {
  try {
    const { participantId } = req.body;
    const currentUserId = req.headers.userid;
    
    // Check if conversation already exists
    let conversation = conversations.find(c => 
      c.participants.includes(currentUserId) && c.participants.includes(participantId)
    );
    
    if (conversation) {
      return res.json(conversation);
    }
    
    // Create new conversation
    conversation = {
      id: generateId(),
      participants: [currentUserId, participantId],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    conversations.push(conversation);
    
    // Add participant details
    const conversationWithParticipants = {
      ...conversation,
      participants: conversation.participants.map(id => findUserById(id))
    };
    
    res.status(201).json(conversationWithParticipants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, content, receiverId } = req.body;
    const senderId = req.headers.userid;
    
    const message = {
      id: generateId(),
      conversationId,
      sender: senderId,
      receiver: receiverId,
      content,
      isRead: false,
      createdAt: new Date()
    };
    
    messages.push(message);
    
    res.status(201).json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Mark message as read
exports.markAsRead = async (req, res) => {
  try {
    const { messageId } = req.body;
    
    const message = messages.find(m => m.id === messageId);
    if (message) {
      message.isRead = true;
      message.readAt = new Date();
      res.json(message);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};