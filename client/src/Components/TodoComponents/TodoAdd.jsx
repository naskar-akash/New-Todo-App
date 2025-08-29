import React from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";
import { addTodo } from "./TodosService";
import AlertMsg from "../AlertMsg";
import { useState } from "react";

const TodoAdd = () => {
  const { serverMsg, status, showAlert } = AlertMsg(2);
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  //submitting
  const onSubmit = async (data) => {
    try {
      const response = await addTodo(data.todoTitle, data.todoDesc);
      showAlert(response, "success", "error");
      setShowForm(false);
    } catch (error) {
      showAlert(error.response || error, "success", "error");
    }
  };

  return (
    <div>
      {/*Showing flash message*/}
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

      <button onClick={() => setShowForm(!showForm)}>
        <IoIosAddCircle className="text-6xl m-1" />
      </button>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <form
            className="flex flex-col gap-5 w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
            onSubmit={handleSubmit(onSubmit)}
            method="post"
          >
            <input
              className="bg-blue-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="todoTitle"
              {...register("todoTitle", {
                required: { value: true, message: "This field is required" },
              })}
              type="text"
            />
            {errors.todoTitle && (
              <div className="text-red-500 text-sm mt-1">
                {errors.todoTitle.message}
              </div>
            )}

            <input
              className="bg-blue-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="todoDesc"
              {...register("todoDesc", {
                required: { value: true, message: "This field is required" },
                minLength: {
                  value: 8,
                  message: "todoDesc should contain minimum 8 characters",
                },
              })}
              type="text"
            />
            {errors.todoDesc && (
              <div className="text-red-500 text-sm mt-1">
                {errors.todoDesc.message}
              </div>
            )}
            <input
              className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-all text-md rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
              type="submit"
              value="Add"
              disabled={isSubmitting}
            />
            <button
              type="button"
              className="font-extrabold text-xl absolute top-2 right-2 p-2 text-gray-400 hover:text-zinc-50 transition-all"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TodoAdd;
