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
    <div className="px-4 py-2 min-h-screen flex flex-col bg-gradient-to-b from-sky-800 to-blue-50">
      
      {/* Top Navigation */}
      <header className="px-4 py-2">
        <div className="flex flex-row justify-between items-center gap-3">
          {/* Back Button - fixed width & left corner */}
          <div className="self-start">
            <button
              className="px-4 py-2 bg-orange-700 text-white text-sm font-semibold rounded-md hover:bg-orange-600"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>

          {/* Filters & Nav Buttons */}
          <div className="flex flex-row justify-center sm:justify-end items-center gap-4">
            <TodoFilter />
            <NavbarBtn />
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main>
        {/* Welcome */}
        <div className="flex flex-row justify-between items-center mb-2 ml-4">
          <h2 className="text-2xl font-semibold py-2 text-left bg-gradient-to-r from-emerald-300 via-rose-300 to-lime-200 bg-clip-text text-transparent">
            Welcome, {fullName}
          </h2>
          <TodoAdd />
        </div>

        {/* Todo Body */}
        <div className="px-6 py-2 md:px-4 md:py-2">
          <TodoBody />
        </div>
      </main>
    </div>
  </TodoContext.Provider>
);

}

export default Todos
