import axios from "axios";
import qs from "qs";
const SERVER_URL = import.meta.env.VITE_SERVER_URI;

// Fetch todos from backend
export async function fetchTodos() {
  try {
    const response = await axios.get(`${SERVER_URL}/todos/`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

// Add a new todo to backend
export async function addTodo(todoTitle, todoDesc) {
  try {
    const data = qs.stringify({ todoTitle, todoDesc });
    const response = await axios.post(`${SERVER_URL}/todos/`, data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // This sends the cookie (token)
    });
    return response;
  } catch (error) {
    throw error;
  }
}

// Delete a todo from backend
export async function deleteTodo(todoId) {
  try {
    const response = await axios.delete(`${SERVER_URL}/todos/${todoId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

// Update a todo in backend
export async function updateTodo(todoId, todoTitle, todoDesc) {
  try {
    const data = qs.stringify({ todoTitle, todoDesc });
    const response = await axios.put(
      `${SERVER_URL}/todos/${todoId}`,
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

// Update todo status in backend
export async function updateTodoStatus(todoId, status) {
  try {
    const data = qs.stringify({ status });
    const response = await axios.put(
      `${SERVER_URL}/todos/${todoId}`,
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}