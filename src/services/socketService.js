import io from 'socket.io-client';
import { getToken } from './authService';

let socket;

export const initSocket = async () => {
  const token = await getToken();
  
  if (!socket) {
    socket = io('http://localhost:5000', {
      transports: ['websocket'],
      auth: {
        token: token
      }
    });
  }
  
  return socket;
};

export const getSocket = () => {
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};