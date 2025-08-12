import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import TodoStatus from "./TodoStatus";
import { fetchTodos } from "../utility/TodosService";


const TodoBody = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
   const response = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrYXNoQG1haWwuY29tIiwiaWQiOiI2ODk4YWZjN2U2N2ZmMmE0M2Q3Y2FjMDIiLCJpYXQiOjE3NTUwMTQxMjZ9.P2lHuB9HrvmqM27VezaZiBCP8G_5O3_jPPr4kGCUl2g";
        if (token) {
          const todosData = await fetchTodos(token);
          setTodos(todosData);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    response(); 
  }, []);

  return (
    <div className="overflow-y-auto max-h-[75vh]">
      <div className="flex flex-wrap justify-center gap-3">
        {todos.length === 0 ? (
              <div className="flex justify-center text-2xl">
                No Todos to Display
              </div>
            ) : (
              todos.map((todo) => {
                return(
                  <div
                    key={todo._id}
                    className={`p-2 m-2 ${
                      todo.status === "Open"
                        ? "bg-blue-600 hover:bg-blue-500"
                        : todo.status === "Ongoing"
                        ? "bg-amber-300 hover:bg-amber-200"
                        : todo.status === "Done"
                        ? "bg-green-500 hover:bg-green-400"
                        : todo.status === "Undo"
                        ? "bg-gray-400 hover:bg-gray-200"
                        : "bg-red-400 hover:bg-red-300"
                    } rounded-lg shadow-lg w-full sm:w-[280px] min-h-[200px] transition-all hover:shadow-md`}
                  >
                    <div className="flex flex-col justify-center">
                      <div className="flex flex-col gap-7">
                        <div className="flex flex-col justify-center gap-3">
                          <h3 className="flex justify-center text-xl font-bold">{todo.todoTitle}</h3>
                          <p className="flex justify-start">
                            {todo.todoDesc}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex justify-start gap-3">
                            <p className="font-semibold">{todo.date}</p>
                            <p className="font-semibold">{todo.time}</p>
                          </div>
                          <div className="flex justify-end gap-2 pb-3">
                            <button onClick={()=>{}}>
                              <MdDeleteOutline className="size-6" />
                            </button>
                            <button onClick={()=>{}}>
                              <CiEdit className="size-6" />
                            </button>
                          </div>
                        </div>
                        <TodoStatus todo={todo}/>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
      </div>
    </div>
  );
};

export default TodoBody;

