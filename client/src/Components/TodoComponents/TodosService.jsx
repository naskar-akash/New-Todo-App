import axios from "axios";
import qs from "qs";

// Fetch todos from backend
export async function fetchTodos(token) {
  try {
    const response = await axios.get("http://localhost:3000/todos/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Add a new todo to backend
export async function addTodo(todoTitle, todoDesc) {
  try {
    const data = qs.stringify({ todoTitle, todoDesc });
    const response = await axios.post("http://localhost:3000/todos/", data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
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
    const response = await axios.delete(`http://localhost:3000/todos/${todoId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

// Update a todo in backend
export async function updateTodo(todoId, updateData) {
  try {
    const data = qs.stringify(updateData);
    const response = await axios.put(
      `http://localhost:3000/todos/${todoId}`,
      data,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}