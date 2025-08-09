import React from 'react'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLog = () => {
    const [serverMsg, setServerMsg] = useState();
    const [status, setStatus] = useState();
    const navigate = useNavigate();
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

    await delay(1);

    const r = await fetch("http://localhost:3000/user/login", { 
      method: "POST", 
      headers: {"Content-Type": "application/json"}, 
      body: JSON.stringify(data), 
      credentials: "include"
    });
    const response = await r.json();

    if (r.ok) {
      // show success message
      setServerMsg(response.message);
      setStatus("success")

      // wait a second for message to appear, then redirect
      setTimeout(() => {
        navigate("/todos"); // redirect to todo page
      }, 2000);
    } else {
      setServerMsg(response.message);
      setStatus("error")
    }
  };

  return (
    <div className="flex flex-col items-center w-full">

      {/*Showing flash message*/}
      {serverMsg && (<div className={`fixed top-[50%] p-6 rounded-lg shadow-lg shadow-zinc-500 text-white transition-transform duration-300 ${status === "success" ? "bg-green-500" : "bg-red-500"}`} style={{left: "50%", transform: "translateX(-50%)"}}>{serverMsg}</div>)}

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
