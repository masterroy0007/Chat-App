import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000';

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (response.ok) {
      await AsyncStorage.setItem('token', data.token);
      return { success: true, data };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (response.ok) {
      await AsyncStorage.setItem('token', data.token);
      return { success: true, data };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('token');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    return null;
  }
};