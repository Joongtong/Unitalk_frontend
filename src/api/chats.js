import axios from 'axios';

const API_URL = 'http://localhost:3791/api';

export const getChats = async () => {
  try {
    const response = await axios.get(`${API_URL}/chats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    return [];
  }
};

export const sendMessage = async (message, sender) => {
  try {
    const response = await axios.post(`${API_URL}/chats`, { message, sender });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    return null;
  }
};