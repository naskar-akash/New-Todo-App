import React from 'react'
import { useNavigate } from 'react-router-dom'
import {getUserProfile} from './UserService'
import { useState,useEffect } from 'react';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        // Adjust this line based on your backend response structure
        setUser(response.data || response);
      } catch (error) {
        setUser(null);
      }
    };
    fetchProfile();
  }, []);


  return (
     <div className='min-h-screen bg-gradient-to-br from-slate-800 to-zinc-600 flex flex-col items-center py-10'>
      <button
        className='self-start px-3 py-2 my-2 mx-3 bg-orange-700 text-white text-sm font-semibold rounded-md hover:cursor-pointer hover:bg-orange-600'
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="bg-white/80 rounded-xl shadow-lg p-8 flex flex-col items-center w-full max-w-md mt-8">
        {/* Profile Picture */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-300 shadow mb-4">
          {user?.profilePic ? (
            // If you store as URL or base64 string
            <img
              src={"user.profilePic"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            // Placeholder if no profile picture
            <div className="w-full h-full flex items-center justify-center bg-orange-100 text-5xl text-orange-400">
              {user?.fullname ? user.fullname[0].toUpperCase() : "?"}
            </div>
          )}
        </div>
        {/* User Info */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{user?.fullname || "Full Name"}</h2>
        <p className="text-gray-600 mb-4">{user?.email || "Email"}</p>
        {/* Add more user info here */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between text-gray-700">
            <span className="font-semibold">Joined:</span>
            <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</span>
          </div>
          {/* Add more fields as needed */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile
