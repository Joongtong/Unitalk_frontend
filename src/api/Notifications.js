import axios from 'axios';

const API_URL = 'http://localhost:3791/api';

export const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_URL}/notifications`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
};