import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { updateTodo } from "./TodosService";
import AlertMsg from "../AlertMsg";

const TodoUpdate = ({ todoId }) => {
  const [open, setOpen] = useState(false);
  const { serverMsg, status, showAlert } = AlertMsg(1);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const handleEdit = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await updateTodo(todoId, data.todoTitle, data.todoDesc);
      showAlert(response,"success","error");
      setOpen(!open);
    } catch (error) {
      showAlert(error.response || error,"success","error");
    }
    reset();
  };

  return (
    <div>
      <button onClick={handleEdit}>
        <CiEdit className="size-6" />
      </button>
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

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen flex items-center justify-center overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900 mb-4"
                  >
                    Edit Todo
                  </DialogTitle>
                  <input
                    className="bg-blue-100 px-4 py-2 rounded-md w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="New Todo Title"
                    {...register("todoTitle", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                    type="text"
                    name="newtodoTitle"
                  />
                  {errors.todoTitle && (
                    <div className="text-red-500 text-sm mb-2">
                      {errors.todoTitle.message}
                    </div>
                  )}

                  <input
                    className="bg-blue-100 px-4 py-2 rounded-md w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="New Todo Description"
                    {...register("todoDesc", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                    type="text"
                    name="newtodoDesc"
                  />
                  {errors.todoDesc && (
                    <div className="text-red-500 text-sm mb-2">
                      {errors.todoDesc.message}
                    </div>
                  )}
                  <div className="flex justify-between">
                    <input
                      className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-all text-md rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
                      type="submit"
                      value="Update"
                      disabled={isSubmitting}
                      name="submit"
                    />
                    <button
                      type="button"
                      className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-all text-md rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default TodoUpdate;
