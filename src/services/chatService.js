import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from './authService';

const API_URL = 'http://localhost:5000';

export const getConversations = async () => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/conversations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getMessages = async (conversationId) => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/conversations/${conversationId}/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const createConversation = async (participantId) => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/conversations/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ participantId }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const sendMessage = async (messageData) => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/conversations/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(messageData),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const markAsRead = async (messageId) => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/conversations/message/read`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ messageId }),
    });

    const data = await response.json();
    
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};