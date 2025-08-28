import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import TodoAdd from "./TodoComponents/TodoAdd"
import TodoBody from "./TodoComponents/TodoBody"
import NavbarBtn from './NavComponents/NavbarBtn';
import { getCurrentUser } from './UserComponents/UserService';

const Todos = () => {
  const navigate = useNavigate();
  const [fullName, setFullname] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await getCurrentUser();
        setFullname(response?.data?.fullname || response?.fullname || "");
      } catch (error) {
        setFullname("")
      }
    };
    fetchUserName();
  }, [])
  

  return (
    <div className='min-h-screen bg-gradient-to-b from-sky-800 to-blue-50'>
      <div className="p-2">
        <div className='flex justify-between gap-2 mb-4'>
        <button className='px-3 py-2 bg-orange-700 text-white text-sm font-semibold rounded-md hover:cursor-pointer hover:bg-orange-600' onClick={() => navigate(-1)}>Back</button>
        <h2 className='text-2xl font-semibold py-2 bg-gradient-to-r from-emerald-300 via-rose-300 to-lime-200 bg-clip-text text-transparent'>Welcome, {fullName}</h2>
        <NavbarBtn/>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-black">My Todos</h1>
        <div className="flex justify-center">
          <TodoAdd/>
        </div>
      </div>
      <TodoBody/>
    </div>
    </div>
  )
}

export default Todos
