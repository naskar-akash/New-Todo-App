import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './UserService';
import { fetchTodos } from '../TodoComponents/TodosService';

const UserNav = () => {
    const navigate = useNavigate();
    const [serverMsg, setServerMsg] = useState();
    const [status, setStatus] = useState();    

    const handleLogout = async () => {
        try {
            const response = await logoutUser();
            // After logout, navigate to the home or login page
            setServerMsg(response.data.message);
            setStatus(response.status === 200 ? "success" : "error");
            //Hide message
            setTimeout(() => setServerMsg(""), 1500);
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    const handleNav = async () => {
        try {
            const response = await fetchTodos();
            if (!Array.isArray(response.data)) {
                setServerMsg(response.data.message);
                setStatus("error");
                setTimeout(() => {
                    setServerMsg("");
                    navigate("/");
                }, 1500);
            } else {
                navigate("/todos");
            }
        } catch (error) {
            console.error("Navigation to todos failed:", error);
        }
    };

  return (
    <div className="flex justify-between gap-5 p-4 rounded-b-2xl">
        {serverMsg && (
        <div
          className={`fixed top-[10%] p-6 rounded-lg shadow-lg shadow-zinc-500 text-white transition-transform duration-300 ${
            status === "success" ? "bg-green-500" : "bg-rose-500"
          }`}
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          {serverMsg}
        </div>
      )}
      <button onClick={()=>{navigate("/todos")}} className="px-3 py-3 mt-4 bg-slate-500 text-white hover:bg-zinc-500 text-sm rounded-md">Profile</button>
      <div className="flex gap-3">
        <button onClick={handleNav} className="px-3 py-3 mt-4 bg-slate-500 text-white hover:bg-zinc-500 text-sm rounded-md">Your Todos</button>
        <button onClick={handleLogout} className="px-3 py-3 mt-4 bg-slate-500 text-white hover:bg-zinc-500 text-sm rounded-md">Logout</button>
      </div>
    </div>
  )
}

export default UserNav
