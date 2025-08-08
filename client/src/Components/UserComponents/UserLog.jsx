import React from 'react'
import { useForm } from "react-hook-form";

const UserLog = () => {
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
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold mb-8 text-blue-600 font-serif">Login</h2>

      <form
        className="flex flex-col gap-5 w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        
        <input
          className="bg-blue-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="email"
          {...register("email", {required: {value: true, message: "This field is required"}})}
          type="email"
        />
        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email.message}</div> }

        <input
          className="bg-blue-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="password"
          {...register("password", {required: {value: true, message: "This field is required"}, minLength: {value: 8, message: "Password should contain minimum 8 characters"}})}
          type="password"
        />
        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password.message}</div> }
        <input
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-all text-md rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
          type="submit" value="Login"
          disabled={isSubmitting}
        />
      </form>
      <div className="text-emerald-500 text-sm mt-4">
        {isSubmitting ? "Logging in..." : ""}
      </div>
    </div>
  )
}

export default UserLog
