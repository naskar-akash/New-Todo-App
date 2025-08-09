import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Todos = () => {
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
    <div>
      <p>Todos will be added here, shown here , updated here and deleted here</p>
      <button className='px-4 py-2 bg-slate-600 text-white text-sm rounded-md mx-2' onClick={()=>navigate(-1)}>Back</button>

      <form
        className="flex flex-col gap-5 w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        
        <input
          className="bg-blue-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Todo Title"
          {...register("todoTitle", {required: {value: true, message: "This field is required"}})}
          type="text"
        />
        {errors.todoTitle && <div className="text-red-500 text-sm mt-1">{errors.todoTitle.message}</div> }

        <input
          className="bg-blue-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Todo Description"
          {...register("todoDesc", {required: {value: true, message: "This field is required"}})}
          type="text"
        />
        {errors.todoDesc && <div className="text-red-500 text-sm mt-1">{errors.todoDesc.message}</div> }

        

        <input
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-all text-md rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
          type="submit" value="Login"
          disabled={isSubmitting}
        />
      </form>
      
    </div>
  )
}

export default Todos
