<<<<<<< HEAD
# Chat App Mobile

Mobile application for the real-time chat application built with React Native.

## Features

- User authentication (Register/Login)
- User list with online/offline status
- Real-time messaging with Socket.IO
- Typing indicators
- Message persistence

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Run on Android:
   ```
   npx react-native run-android
   ```

3. Run on iOS:
   ```
   npx react-native run-ios
   ```
=======
<<<<<<< HEAD
# Real-time Chat Application

A real-time chat application built with React Native (frontend) and Node.js + Socket.IO (backend).
>>>>>>> 7083c7aed1a5dc3298f4c3b4bb727ef65ed54fe7

## Project Structure

```
<<<<<<< HEAD
src/
├── components/     # Reusable UI components
├── navigation/     # Navigation configuration
├── screens/        # Screen components
├── services/       # API and Socket.IO services
└── utils/          # Utility functions
```

## Dependencies

- React Navigation for navigation
- Socket.IO Client for real-time communication
- Async Storage for token storage

## Screens

1. **LoginScreen** - User authentication
2. **RegisterScreen** - User registration
3. **HomeScreen** - List of users
4. **ChatScreen** - Real-time chat interface

## Services

- **authService** - Handles user authentication
- **userService** - Manages user data
- **chatService** - Handles chat functionality
- **socketService** - Manages Socket.IO connections
=======
.
├── mobile/          # React Native mobile application
│   ├── src/
│   │   ├── components/
│   │   ├── navigation/
│   │   ├── screens/
│   │   ├── services/
│   │   └── utils/
│   └── ...
└── server/          # Node.js + Express backend
    ├── controllers/
    ├── models/
    ├── routes/
    └── ...
```

## Features

### Authentication
- User registration and login with JWT
- Password hashing with bcrypt

### User Management
- User list with online/offline status
- Last seen tracking

### Real-time Chat
- Instant messaging with Socket.IO
- Typing indicators
- Message read receipts
- Online/offline status

### Data Persistence
- MongoDB database integration
- Message history storage

## Tech Stack

### Frontend (Mobile)
- React Native
- Socket.IO Client
- React Navigation

### Backend (Server)
- Node.js
- Express.js
- Socket.IO
- MongoDB with Mongoose
- JWT for authentication

## Setup Instructions

### Server Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/chatapp
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Run the server:
   ```
   npm run dev
   ```

### Mobile App Setup

1. Navigate to the mobile directory:
   ```
   cd mobile
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run on Android:
   ```
   npx react-native run-android
   ```

4. Run on iOS:
   ```
   npx react-native run-ios
   ```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/status` - Update user online status

### Conversations
- `GET /conversations` - Get user conversations
- `POST /conversations/create` - Create/get conversation
- `GET /conversations/:id/messages` - Get conversation messages
- `POST /conversations/message` - Send message
- `PUT /conversations/message/read` - Mark message as read

## Socket.IO Events

### Client to Server
- `user:join` - Join user to room
- `message:send` - Send new message
- `typing:start` - Start typing indicator
- `typing:stop` - Stop typing indicator
- `message:read` - Mark message as read

### Server to Client
- `message:new` - Receive new message
- `typing:start` - Show typing indicator
- `typing:stop` - Hide typing indicator
- `message:read` - Update message read status

## Sample Users

After starting the server, you can register users through the mobile app:

1. Register a new user with:
   - Username: user1
   - Email: user1@example.com
   - Password: password123

2. Register a second user with:
   - Username: user2
   - Email: user2@example.com
   - Password: password123

Then login with each user on different devices or emulators to test the chat functionality.

## Development

### Server
- Uses Express.js for REST API
- Socket.IO for real-time communication
- MongoDB for data persistence
- JWT for authentication

### Mobile
- React Native for cross-platform mobile development
- React Navigation for screen navigation
- Socket.IO Client for real-time messaging
- AsyncStorage for token storage

## Future Enhancements

- Push notifications
- Image/file sharing
- Group chats
- Message encryption
- User profile management
=======
# Real-time Chat Application

A real-time chat application built with React Native (frontend) and Node.js + Socket.IO (backend).

## Project Structure

```
.
├── mobile/          # React Native mobile application
│   ├── src/
│   │   ├── components/
│   │   ├── navigation/
│   │   ├── screens/
│   │   ├── services/
│   │   └── utils/
│   └── ...
└── server/          # Node.js + Express backend
    ├── controllers/
    ├── models/
    ├── routes/
    └── ...
```

## Features

### Authentication
- User registration and login with JWT
- Password hashing with bcrypt

### User Management
- User list with online/offline status
- Last seen tracking

### Real-time Chat
- Instant messaging with Socket.IO
- Typing indicators
- Message read receipts
- Online/offline status

### Data Persistence
- MongoDB database integration
- Message history storage

## Tech Stack

### Frontend (Mobile)
- React Native
- Socket.IO Client
- React Navigation

### Backend (Server)
- Node.js
- Express.js
- Socket.IO
- MongoDB with Mongoose
- JWT for authentication

## Setup Instructions

### Server Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/chatapp
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Run the server:
   ```
   npm run dev
   ```

### Mobile App Setup

1. Navigate to the mobile directory:
   ```
   cd mobile
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run on Android:
   ```
   npx react-native run-android
   ```

4. Run on iOS:
   ```
   npx react-native run-ios
   ```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/status` - Update user online status

### Conversations
- `GET /conversations` - Get user conversations
- `POST /conversations/create` - Create/get conversation
- `GET /conversations/:id/messages` - Get conversation messages
- `POST /conversations/message` - Send message
- `PUT /conversations/message/read` - Mark message as read

## Socket.IO Events

### Client to Server
- `user:join` - Join user to room
- `message:send` - Send new message
- `typing:start` - Start typing indicator
- `typing:stop` - Stop typing indicator
- `message:read` - Mark message as read

### Server to Client
- `message:new` - Receive new message
- `typing:start` - Show typing indicator
- `typing:stop` - Hide typing indicator
- `message:read` - Update message read status

## Sample Users

After starting the server, you can register users through the mobile app:

1. Register a new user with:
   - Username: user1
   - Email: user1@example.com
   - Password: password123

2. Register a second user with:
   - Username: user2
   - Email: user2@example.com
   - Password: password123

Then login with each user on different devices or emulators to test the chat functionality.

## Development

### Server
- Uses Express.js for REST API
- Socket.IO for real-time communication
- MongoDB for data persistence
- JWT for authentication

### Mobile
- React Native for cross-platform mobile development
- React Navigation for screen navigation
- Socket.IO Client for real-time messaging
- AsyncStorage for token storage

## Future Enhancements

- Push notifications
- Image/file sharing
- Group chats
- Message encryption
- User profile management
>>>>>>> f2e3948d96c100d8199b66b3f4c29f8fb3eb5b5d
- Message search functionality
>>>>>>> 7083c7aed1a5dc3298f4c3b4bb727ef65ed54fe7
