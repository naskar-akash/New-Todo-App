import React, { use } from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { registerUser } from './UserService';

const UserReg = () => {
  const [serverMsg, setServerMsg] = useState();
  const [status, setStatus] = useState();
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
    //simulate delay
    await delay(1);
    try {
      const response = await registerUser(data.fullname, data.email, data.password);
      setServerMsg(response.data.message);
      setStatus(response.status === 201 ?"success":"error");
    //Hide message
    setTimeout(()=>setServerMsg(""),2000);
    } catch (error) {
      if (error.response) {
        setServerMsg(error.response.data.message);
        setStatus(error.statusText);
        //Hide message
        setTimeout(()=>setServerMsg(""),2000); 
      } else {
        console.log(error);
        
      }
    }
  };
  
  return (
    <div className="flex flex-col items-center w-full relative">

      {/*Showing flash message*/}
      {serverMsg && (<div className={`fixed top-[50%] p-6 rounded-lg shadow-lg shadow-zinc-500 text-white transition-transform duration-300 ${status === "success" ? "bg-emerald-500" : "bg-rose-500"}`} style={{left: "50%", transform: "translateX(-50%)"}}>{serverMsg}</div>)}

      <h2 className="text-2xl font-bold mb-6 text-blue-600 font-serif">Create Account</h2>

      <form
        className="flex flex-col gap-5 w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        {/*Fullname input*/}
        <input
          className="bg-blue-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="fullname"
          {...register("fullname", {required: {value: true, message: "This field is required"}})}
          type="text"
        />
        {errors.fullname && <div className="text-red-500 text-sm mt-1">{errors.fullname.message}</div> }

        {/*Email input*/}
        <input
          className="bg-blue-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="email"
          {...register("email", {required: {value: true, message: "This field is required"}})}
          type="email"
        />
        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email.message}</div> }

        {/*Password input*/}
        <input
          className="bg-blue-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="password"
          {...register("password", {required: {value: true, message: "This field is required"}, minLength: {value: 8, message: "Password should contain minimum 8 characters"}})}
          type="password"
        />
        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password.message}</div> }

        {/*Submitting the form*/}
        <input
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-all text-md rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting}
        />
      </form>
      <div className="text-orange-500 text-sm mt-4">
        {isSubmitting ? "Creating user..." : ""}
      </div>
    </div>
  )
}

export default UserReg
