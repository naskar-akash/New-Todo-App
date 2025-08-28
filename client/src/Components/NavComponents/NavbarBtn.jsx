import React from 'react'
import { IoReorderThreeSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react'
import useNavService from '../NavComponents/NavService';

const NavbarBtn = () => {
  const [open, setOpen] = useState(false);
  const { handleHome, handleTodos, handleProfile, handleLogout, serverMsg, status } = useNavService();

  return (
    <div>
      {serverMsg && (
        <div
          className={`fixed top-[10%] p-6 rounded-lg shadow-lg text-white transition-transform duration-300 ${
            status === "success" ? "bg-green-500" : "bg-red-500"
          }`}
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          {serverMsg}
        </div>
      )}
      <button onClick={()=>setOpen(!open)} className='flex flex-col justify-center items-center pt-2'>
        <IoReorderThreeSharp className="size-10 text-blue-950 transition-all hover:text-sky-100"/>
      </button>
      {open && (
        <div className="absolute top-16 right-4 bg-zinc-600 text-gray-100 rounded-lg shadow-lg p-4 w-48 z-50">
          <ul className="space-y-2">
            <div className='flex justify-between items-center'>
              <li>
              <button onClick={handleHome}>Home</button>
            </li>
            <RxCross2 onClick={()=>{setOpen(!open)}}/>
            </div>
            <li>
              <button onClick={handleTodos}>Todos</button>
            </li>
            <li>
              <button onClick={handleProfile}>Profile</button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default NavbarBtn
