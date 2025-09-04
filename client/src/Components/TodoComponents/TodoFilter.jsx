import React, { useState, useEffect } from "react";
import { useTodoContext } from "../TodoContext";
import { FiFilter } from "react-icons/fi";

const TodoFilter = () => {
  const [searchDate, setSearchDate] = useState("");
  const { todos, setFilterTodos } = useTodoContext();
  const [filterIcon, setFilterIcon] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  // Listen to window resize
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchFilter = (e) => {
    const searchText = e.target.value;

    const result = todos.filter(
      (i) =>
        i.todoTitle.toLowerCase().includes(searchText.toLowerCase()) ||
        i.todoDesc.toLowerCase().includes(searchText.toLowerCase())
    );
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
    setFilterIcon(!filterIcon)
  };

  return (
    <>
      <button
        onClick={() => setFilterIcon(!filterIcon)}
        className="flex md:hidden text-2xl text-white mx-2 mt-2"
      >
        <FiFilter/>
      </button>

      {(filterIcon || isLargeScreen) && (
        <div className="w-full flex flex-col sm:flex-row justify-center gap-4 items-center">
          <input
            onChange={handleSearchFilter}
            className="w-full px-3 py-2 rounded-md bg-sky-100 outline-none"
            type="text"
            name=""
            id=""
            placeholder="search here..."
          />
          <input
            onChange={(e) => setSearchDate(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-sky-100 text-gray-500 outline-none"
            type="date"
            name=""
            id=""
          />
          <button
            onClick={handleClearFilter}
            className="w-full px-3 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-400"
          >
            Remove Filter
          </button>
        </div>
      )}
    </>
  );
};

export default TodoFilter;
