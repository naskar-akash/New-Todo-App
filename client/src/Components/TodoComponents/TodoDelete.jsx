import React from "react";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { deleteTodo } from "./TodosService";

const TodoDelete = ({ todoId }) => {
  const [serverMsg, setServerMsg] = useState();
  const [status, setStatus] = useState();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteTodo(todoId);

      setServerMsg(response.data.message);
      setStatus(response && response.status === 200 ? "success" : "error");
      //Hide message
      setTimeout(() => setServerMsg(""), 1000);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      {serverMsg && (
        <div
          className={`fixed top-[50%] p-6 rounded-lg shadow-lg shadow-zinc-500 text-white transition-transform duration-300 ${
            status === "success" ? "bg-green-500" : "bg-red-500"
          }`}
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          {serverMsg}
        </div>
      )}

      <button onClick={handleDelete}>
        <MdDeleteOutline className="size-6" />
      </button>
    </div>
  );
};

export default TodoDelete;
