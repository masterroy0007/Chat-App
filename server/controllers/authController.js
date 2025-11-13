// In-memory data store for testing
const users = [
  { id: '1', username: 'user1', email: 'user1@example.com', password: 'password123', isOnline: false },
  { id: '2', username: 'user2', email: 'user2@example.com', password: 'password123', isOnline: false }
];

// Helper function to find user by email
const findUserByEmail = (email) => users.find(u => u.email === email);

// Helper function to find user by email and password
const findUser = (email, password) => users.find(u => u.email === email && u.password === password);

// Register user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    let user = findUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      email,
      password,
      isOnline: false
    };

    users.push(newUser);

    // Generate token (simplified for testing)
    const token = `token_${newUser.id}`;

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = findUser(email, password);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token (simplified for testing)
    const token = `token_${user.id}`;

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};