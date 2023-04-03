import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoPerPage, setTodoPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data));
  }, []);

  const noOfTotalPages = Math.ceil(todos.length / todoPerPage);
  const pages = [...Array(noOfTotalPages + 1).keys()].slice(1);
  const indexOfLastTodo = currentPage * todoPerPage;
  const indexOfFirstTodos = indexOfLastTodo - todoPerPage;

  const visibleTodos = todos.slice(indexOfFirstTodos, indexOfLastTodo);

  const prevPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const nextPageHandler = () => {
    if (currentPage !== noOfTotalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <select onChange={(e) => setTodoPerPage(e.target.value)}>
        <option value="10">10</option>
        <option value="30">30</option>
        <option value="50">50</option>
      </select>
      <div>
        {visibleTodos.map((todo) => (
          <p key={todo.id}>{todo.title}</p>
        ))}
        <span onClick={prevPageHandler}>Prev</span>
        <p>
          {pages.map((page) => (
            <span
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`${currentPage === page ? "active" : ""}`}
            >{`${page} | `}</span>
          ))}
        </p>
        <span onClick={nextPageHandler}>Next</span>
      </div>
    </>
  );
};

export default App;
