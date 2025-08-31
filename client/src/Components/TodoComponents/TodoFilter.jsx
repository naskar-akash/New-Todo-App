import React,{useState,useEffect} from 'react'
import { fetchTodos } from './TodosService';

const TodoFilter = (response) => {
  const [todo, setTodo] = useState([])

   useEffect(() => {
     const getTodo = async () => {
        try {
         const response = await fetchTodos();
         const todoData = response.data;
         setTodo(todoData)
        } catch (error) {
          console.error(error);
        }
      }
      getTodo(); 
    }, []);

  const handleSearchFilter = (e) => {
    const searchText = e.target.value;
    console.log(searchText);
  }

  const handleDateFilterCnge = (e) => {
    const searchDate = e.target.value;
    const [y,m,d] = searchDate.split("-");
    const modDate = `${d}-${m}-${y}`;
    console.log(modDate,todo);
  }

  const handleDateFilter = (e) => {
    alert("Clicked")
  }

  return (
    <div className='flex justify-between gap-10 items-center'>
      <input onChange={handleSearchFilter} className='px-3 py-2 rounded-md bg-sky-100 outline-none' type="text" name="" id="" placeholder='search here...'/>
      <div className="flex gap-2">
      <input onChange={handleDateFilterCnge} className='px-3 py-2 rounded-md bg-sky-100 text-gray-500 outline-none' type="date" name="" id="" />
      <button onClick={handleDateFilter} className='px-3 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-400'>Filter</button>
      </div>
    </div>
  )
}

export default TodoFilter
