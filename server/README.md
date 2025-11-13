# Chat App Server

Backend server for the real-time chat application built with Node.js, Express, Socket.IO, and MongoDB.

## Features

- User authentication with JWT
- Real-time messaging with Socket.IO
- Online/offline status tracking
- Message persistence in MongoDB
- Typing indicators
- Message read receipts

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/chatapp
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

3. Run the server:
   ```
   npm run dev
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

## Socket Events

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