import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const TodoBody = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/todos/", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch todos");
        return res.json();
      })
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

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
                            <button>
                              <MdDeleteOutline className="size-6" />
                            </button>
                            <button>
                              <CiEdit className="size-6" />
                            </button>
                          </div>
                        </div>
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

