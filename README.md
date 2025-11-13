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

## Project Structure

```
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