import React from "react";
import { useForm } from "react-hook-form";
import AlertMsg from "../AlertMsg";
import { updateTodoStatus } from "./TodosService";

const TodoStatus = ({ todo }) => {
  const { serverMsg, status, showAlert } = AlertMsg(1.5);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await updateTodoStatus(todo._id, data.status);
      showAlert(response, "success", "error");
    } catch (error) {
      showAlert(error.response || error, "success", "error");
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mt-2"
      >
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="Open"
              {...register("status")}
              defaultChecked={todo.status === "Open"}
            />
            Open
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="Ongoing"
              {...register("status")}
              defaultChecked={todo.status === "Ongoing"}
            />
            Ongoing
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="Done"
              {...register("status")}
              defaultChecked={todo.status === "Done"}
            />
            Done
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="Undo"
              {...register("status")}
              defaultChecked={todo.status === "Undo"}
            />
            Undo
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="Unseen"
              {...register("status")}
              defaultChecked={todo.status === "Unseen"}
            />
            Unseen
          </label>
        </div>

        <button
          type="submit"
          className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 text-sm"
        >
          Update Status
        </button>
      </form>
    </div>
  );
};

export default TodoStatus;
