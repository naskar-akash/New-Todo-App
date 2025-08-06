import { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <form
        className="flex flex-col gap-5 w-2/3 justify-center mt-10 font-serif"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="bg-zinc-300 px-3 py-2 mx-3 rounded-md"
          defaultValue="todo title"
          {...register("todoTitle")}
        />
        <input
          className="bg-zinc-300 px-3 py-2 mx-3 rounded-md"
          defaultValue="todo description"
          {...register("todoDesc")}
        />
        <label className="text-lg mx-3">Choose status:</label>
        <select className="bg-zinc-300 px-3 py-2 mx-3 rounded-md" {...register("status")}>
        <option value="open">open</option>
        <option value="ongoing">ongoing</option>
        <option value="done">done</option>
        <option value="unseen">unseen</option>
      </select>

        <input
          className="bg-blue-500 text-white px-3 py-2 mx-3 text-sm rounded-md"
          type="submit"
        />
      </form>
    </div>
  );
}

export default App;
