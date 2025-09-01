import React, { useState, useEffect } from "react";
import { useTodoContext } from "../TodoContext";

const TodoFilter = () => {
  const [searchDate, setSearchDate] = useState("");
  const {todos, setFilterTodos} = useTodoContext();

  const handleSearchFilter = (e) => {
    const searchText = e.target.value;
    
    const result = todos.filter((i) => i.todoTitle.toLowerCase().includes(searchText.toLowerCase()) || i.todoDesc.toLowerCase().includes(searchText.toLowerCase()));
    setFilterTodos(result); 
  };

  useEffect(() => {
    if (!searchDate) {
      setFilterTodos(todos);
      return;
    }
    const [y, m, d] = searchDate.split("-");
    const modDate = `${d}-${m}-${y}`;
    const result = todos.filter((i) => i.date === modDate);
    setFilterTodos(result);
  }, [searchDate, todos, setFilterTodos]);

  const handleClearFilter = () => {
    setFilterTodos(todos);
  };

  return (
    <div className="flex justify-between gap-10 items-center">
      <input
        onChange={handleSearchFilter}
        className="px-3 py-2 rounded-md bg-sky-100 outline-none"
        type="text"
        name=""
        id=""
        placeholder="search here..."
      />
        <input
          onChange={(e) => setSearchDate(e.target.value)}
          className="px-3 py-2 rounded-md bg-sky-100 text-gray-500 outline-none"
          type="date"
          name=""
          id=""
        />
        <button
          onClick={handleClearFilter}
          className="px-3 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-400"
        >
          Remove Filter
        </button>
    </div>
  );
};

export default TodoFilter;
