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
