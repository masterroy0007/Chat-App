const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUsers, getUserById, updateUserStatus } = require('../controllers/usersController');

// GET /users - Get all users
router.get('/', auth, getUsers);

// GET /users/:id - Get user by ID
router.get('/:id', auth, getUserById);

// PUT /users/status - Update user online status
router.put('/status', auth, updateUserStatus);

module.exports = router;