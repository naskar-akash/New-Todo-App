import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { deleteTodo } from "./TodosService";
import AlertMsg from "../AlertMsg";

const TodoDelete = ({ todoId }) => {
  const { serverMsg, status, showAlert } = AlertMsg(1.5);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteTodo(todoId);
      showAlert(response,"success","error");
    } catch (error) {
      showAlert(error.response || error,"success","error");
    }
  };

  return (
    <div>
      {/* Showing flash message */}
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
