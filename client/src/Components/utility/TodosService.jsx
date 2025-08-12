import axios from 'axios';
import qs from 'qs';

// Fetch todos from backend
export async function fetchTodos(token) {
  try {
    const response = await axios.get('http://localhost:3000/todos/', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}