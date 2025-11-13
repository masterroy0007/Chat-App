// In-memory data store for testing
const users = [
  { id: '1', username: 'user1', email: 'user1@example.com', password: 'password123', isOnline: false },
  { id: '2', username: 'user2', email: 'user2@example.com', password: 'password123', isOnline: false }
];

// Helper function to find user by ID
const findUserById = (id) => users.find(u => u.id === id);

// Get all users
exports.getUsers = async (req, res) => {
  try {
    // Get all users except the current user
    const allUsers = users.filter(u => u.id !== req.headers.userid);
    res.json(allUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update user online status
exports.updateUserStatus = async (req, res) => {
  try {
    const { isOnline } = req.body;
    const user = findUserById(req.headers.userid);
    
    if (user) {
      user.isOnline = isOnline;
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};