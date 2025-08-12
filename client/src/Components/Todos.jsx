import React from 'react'
import { useNavigate } from 'react-router-dom';
import TodoAdd from "./TodoComponents/TodoAdd"
import TodoBody from "./TodoComponents/TodoBody"
import TodoUpdate from "./TodoComponents/TodoUpdate"

const Todos = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="p-2">
        <button className='px-3 py-2 bg-zinc-500 text-white text-sm font-semibold rounded-md hover:cursor-pointer hover:bg-zinc-400' onClick={() => navigate(-1)}>Back</button>
        <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">My Todos</h1>
        <div className="flex justify-center">
          <TodoAdd/>
        </div>
      </div>
      <TodoBody/>
      <TodoUpdate/>
    </div>
    </div>
  )
}

export default Todos
