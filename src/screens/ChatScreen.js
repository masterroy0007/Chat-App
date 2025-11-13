import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getMessages, sendMessage } from '../services/chatService';
import { getSocket } from '../services/socketService';

const ChatScreen = ({ route }) => {
  const { user } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);
  const socket = getSocket();

  useEffect(() => {
    loadMessages();
    
    if (socket) {
      // Listen for new messages
      socket.on('message:new', handleNewMessage);
      
      // Listen for typing indicators
      socket.on('typing:start', handleTypingStart);
      socket.on('typing:stop', handleTypingStop);
    }
    
    return () => {
      if (socket) {
        socket.off('message:new', handleNewMessage);
        socket.off('typing:start', handleTypingStart);
        socket.off('typing:stop', handleTypingStop);
      }
    };
  }, []);

  const loadMessages = async () => {
    // In a real app, you would get the conversation ID from the backend
    // For now, we'll just show an empty chat
    setLoading(false);
  };

  const handleNewMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
    scrollToBottom();
  };

  const handleTypingStart = (data) => {
    if (data.userId === user._id) {
      setIsTyping(true);
    }
  };

  const handleTypingStop = (data) => {
    if (data.userId === user._id) {
      setIsTyping(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const messageData = {
      content: inputText,
      receiverId: user._id,
      // In a real app, you would include the conversation ID
    };
    
    // Send message via socket
    if (socket) {
      socket.emit('message:send', messageData);
    }
    
    // Also send via REST API as fallback
    const result = await sendMessage(messageData);
    if (result.success) {
      setMessages(prevMessages => [...prevMessages, result.data]);
      setInputText('');
      scrollToBottom();
      
      // Stop typing indicator
      if (socket) {
        socket.emit('typing:stop', { receiverId: user._id });
      }
    } else {
      Alert.alert('Error', result.error);
    }
  };

  const handleTyping = (text) => {
    setInputText(text);
    
    // Send typing indicator
    if (socket && text.length > 0) {
      socket.emit('typing:start', { receiverId: user._id });
    } else if (socket && text.length === 0) {
      socket.emit('typing:stop', { receiverId: user._id });
    }
  };

  const renderMessage = ({ item }) => {
    const isOwnMessage = item.sender?._id !== user._id;
    
    return (
      <View style={[
        styles.messageContainer,
        isOwnMessage ? styles.ownMessage : styles.otherMessage
      ]}>
        <View style={[
          styles.messageBubble,
          isOwnMessage ? styles.ownBubble : styles.otherBubble
        ]}>
          <Text style={[
            styles.messageText,
            isOwnMessage ? styles.ownText : styles.otherText
          ]}>
            {item.content}
          </Text>
          <Text style={styles.timestamp}>
            {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={scrollToBottom}
      />
      
      {isTyping && (
        <View style={styles.typingIndicator}>
          <Text style={styles.typingText}>{user.username} is typing...</Text>
        </View>
      )}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={handleTyping}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    alignItems: 'flex-start',
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
  },
  ownBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  ownText: {
    color: 'white',
  },
  otherText: {
    color: 'black',
  },
  timestamp: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  typingIndicator: {
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  typingText: {
    fontStyle: 'italic',
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatScreen;