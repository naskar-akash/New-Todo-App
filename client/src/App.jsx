import { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  //delay function
  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d*1000);
    })
  };

  //submitting
  const onSubmit = async (data) => {
    await delay(2);
    console.log(data);
  };

  return (
    <div className="flex flex-col">
      {isSubmitting?<div className="text-xl mx-3 my-2">Creating user...</div>:<div className="text-xl mx-3 my-2">Create user</div>}

      <form
        className="flex flex-col gap-5 w-2/3 justify-center mt-10 font-serif"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="bg-zinc-300 px-3 py-2 mx-3 rounded-md"
          placeholder="fullname"
          {...register("fullname", {required: {value: true, message: "This field is required"}})}
          type="text"
        />
        {errors.fullname && <div className="text-red-500 text-sm mt-2">{errors.fullname.message}</div> }
        <input
          className="bg-zinc-300 px-3 py-2 mx-3 rounded-md"
          placeholder="email"
          {...register("email", {required: {value: true, message: "This field is required"}})}
          type="email"
        />
        {errors.email && <div className="text-red-500 text-sm mt-2">{errors.email.message}</div> }
        <input
          className="bg-zinc-300 px-3 py-2 mx-3 rounded-md"
          placeholder="password"
          {...register("password", {required: {value: true, message: "This field is required"}, minLength: {value: 8, message: "Password should contain minimum 8 characters"}})}
          type="password"
        />
        {errors.password && <div className="text-red-500 text-sm mt-2">{errors.password.message}</div> }
        <input
          className="bg-blue-500 text-white px-3 py-2 mx-3 text-sm rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}

export default App;
