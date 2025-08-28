import axios from "axios";
import qs from "qs";

//Register a new user
export async function registerUser(fullname, email, password) {
  try {
    const data = qs.stringify({ fullname, email, password });
    const response = await axios.post(
      "http://localhost:3000/user/register",
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

//Login user
export async function loginUser(email, password) {
    try {
    const data = qs.stringify({ email, password });
    const response = await axios.post(
      "http://localhost:3000/user/login",
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

//Logout user
export async function logoutUser() {
  try {
    const response = await axios.post(
      "http://localhost:3000/user/logout",
      null, // No data needed for logout
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

// Get current logged-in user
export async function getCurrentUser() {
  try {
    const response = await axios.get("http://localhost:3000/user/me", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}