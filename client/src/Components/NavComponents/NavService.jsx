import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../UserComponents/UserService';
import { fetchTodos } from '../TodoComponents/TodosService';
import AlertMsg from '../AlertMsg';


export default function useNavService() {
  const navigate = useNavigate();
  const { serverMsg, status, showAlert } = AlertMsg(2);

  const handleHome = () => navigate("/");
  const handleProfile = () => navigate("/profile");

  const handleTodos = async () => {
    try {
      const response = await fetchTodos();
      if (Array.isArray(response.data)) {
        navigate("/todos");
      } else {
        showAlert(response, "success", "error");
        navigate("/");
      }
    } catch (error) {
      showAlert(error.response || error, "success", "error");
      navigate("/");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      showAlert(response, "success", "error");
      navigate("/");
    } catch (error) {
      showAlert(error.response || error, "success", "error");
      navigate("/");
    }
  };

  return { handleHome, handleTodos, handleProfile, handleLogout, serverMsg, status, showAlert };
}