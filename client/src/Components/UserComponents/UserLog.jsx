import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { loginUser } from './UserService';
import AlertMsg from '../AlertMsg';

const UserLog = () => {
  const { serverMsg,status,showAlert } = AlertMsg(2);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm();

  //submitting
  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data.email, data.password);
      showAlert(response,"success","error");
      navigate("/todos");      
    } catch (error) {
      showAlert(error.response || error,"success","error");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">

      {/*Showing flash message*/}
      {serverMsg && (<div className={`fixed top-[50%] p-6 rounded-lg shadow-lg shadow-zinc-500 text-white transition-transform duration-300 ${status === "success" ? "bg-green-500" : "bg-red-500"}`} style={{left: "50%", transform: "translateX(-50%)"}}>{serverMsg}</div>)}

      <h2 className="text-2xl font-bold mb-6 text-blue-600 font-serif">Login</h2>

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
          name='email'
        />
        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email.message}</div> }

        <input
          className="bg-blue-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="password"
          {...register("password", {required: {value: true, message: "This field is required"}, minLength: {value: 8, message: "Password should contain minimum 8 characters"}})}
          type="password"
          name='password'
        />
        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password.message}</div> }
        <input
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-all text-md rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
          type="submit" value="Login"
          disabled={isSubmitting}
          name='submit'
        />
      </form>
      <div className="text-emerald-500 text-sm mt-4">
        {isSubmitting ? "Logging in..." : ""}
      </div>
    </div>
  )
}

export default UserLog
