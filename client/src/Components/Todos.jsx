import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import TodoAdd from "./TodoComponents/TodoAdd"
import TodoBody from "./TodoComponents/TodoBody"
import NavbarBtn from './NavComponents/NavbarBtn';
import TodoFilter from './TodoComponents/TodoFilter';
import {TodoContext} from './TodoContext';
import { getCurrentUser } from './UserComponents/UserService';
import { fetchTodos } from "./TodoComponents/TodosService";

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [filterTodos, setFilterTodos] = useState([]);
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
  }, []);

  useEffect(() => {
      const getTodo = async () => {
        try {
          const response = await fetchTodos();
          const todoData = response.data;
          setTodos(todoData);
          setFilterTodos(todoData);
        } catch (error) {
          console.error(error);
        }
      };
      getTodo();
    }, []);
  

  return (
    <TodoContext.Provider value={{ todos, filterTodos, setFilterTodos }}>
    <div className='min-h-screen bg-gradient-to-b from-sky-800 to-blue-50'>
      <div className="p-2 relative">
        <div className='flex justify-between gap-2 px-6 items-center mb-4'>
        <button className='px-4 py-2 bg-orange-700 text-white text-sm font-semibold rounded-md hover:cursor-pointer hover:bg-orange-600' onClick={() => navigate(-1)}>Back</button>
        <TodoFilter/>
        <NavbarBtn/>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-4">
        <h2 className='pl-4 text-2xl font-semibold py-2 bg-gradient-to-r from-emerald-300 via-rose-300 to-lime-200 bg-clip-text text-transparent'>Welcome, {fullName}</h2>
        <div className="flex justify-center">
          <TodoAdd/>
        </div>
      </div>
      <TodoBody/>
    </div>
    </div>
    </TodoContext.Provider>
  )
}

export default Todos
