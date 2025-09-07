import axios from "axios";
import qs from "qs";
const SERVER_URL = import.meta.env.VITE_SERVER_URI;

//Register a new user
export async function registerUser(fullname, email, password) {
  try {
    const data = qs.stringify({ fullname, email, password });
    const response = await axios.post(
      `${SERVER_URL}/user/register`,
      data,
      {
        headers: { "Content-Type": "application/json" },
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
      `${SERVER_URL}/user/login`,
      data,
      {
        headers: { "Content-Type": "application/json" },
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
      `${SERVER_URL}/user/logout`,
      null, // No data needed for logout
      {
        headers: { "Content-Type": "application/json" },
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
    const response = await axios.get(`${SERVER_URL}/user/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

//Get user profile by ID
export async function getUserProfile() {
  try {
    const response = await axios.get(
      `${SERVER_URL}/user/profile`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

//Update user profile picture
export async function updateProfilePic(file) {
  try {
    const formData = new FormData();
    formData.append("profilepic", file);
    const response = await axios.post(
      `${SERVER_URL}/user/profile/pic`,
      formData, 
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Deleting user profile picture
export async function deleteProfilePic() {
  try {
    const response = await axios.delete(
      `${SERVER_URL}/user/profile/pic`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}