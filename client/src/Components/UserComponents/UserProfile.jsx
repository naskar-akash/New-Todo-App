import React from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "./UserService";
import { useState, useEffect } from "react";
import NavbarBtn from "../NavComponents/NavbarBtn";

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
    <div className="min-h-screen bg-gradient-to-br from-neutral-600 to-slate-500 flex flex-col items-center py-10">
      <div className="w-full flex justify-between px-6 items-center mb-4">
        <button
          className="px-4 py-2 bg-emerald-500 text-white text-base font-bold rounded-lg shadow transition-all hover:bg-emerald-400"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <NavbarBtn />
      </div>
      <div className="bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-md mt-8">
        {/* Profile Picture */}
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-orange-300 shadow-lg mb-4">
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
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-wide drop-shadow">
          {user?.fullname || "Full Name"}
        </h2>
        <p className="text-lg text-gray-600 mb-4">{user?.email || "Email"}</p>
        {/* Add more user info here */}
        <div className="w-full flex flex-col gap-3">
          <div className="flex justify-center gap-4 text-gray-700 text-base">
            <span className="font-semibold">Joined:</span>
            <span>
              <span className="font-bold">{user?.date ? user.date : "N/A"}</span>
              {" "}
              <span className="text-gray-500">at</span>
              {" "}
              <span className="font-bold">{user?.time ? user.time : "N/A"}</span>
            </span>
          </div>
          {/* Add more fields as needed */}
        </div>
        {/* Divider */}
        <div className="w-full border-t border-orange-200 my-6"></div>
        {/* Action Buttons (optional) */}
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-lg font-semibold shadow hover:scale-105 transition-all">
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-lime-400 to-green-400 text-white rounded-lg font-semibold shadow hover:scale-105 transition-all">
            Change Picture
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
