import React, { useEffect, useState } from "react";
import { InputAddToDo } from "../InputAddToDo/InputAddToDo";
import { FilterToDoPanel } from "../FilterToDoPanel/FilterToDoPanel";
import { ToDo } from "../ToDo/ToDo";
import APIHelper from "../../services/API.js";

import "./App.css";

function App() {
  const [visibleTodos, setVisibleToDos] = useState([]);
  const [countActive, setCountActive] = useState(0);
  const [todos, setToDos] = useState([]);

  // Get All ToDo
  const fetchTodoAndSetToDos = async () => {
    const todos = await APIHelper.getAllToDos();
    setToDos(todos);
    setVisibleToDos(todos);
  };

  // Add ToDo
  const createTodo = async (e, value) => {
    e.preventDefault();
    if (!value) {
      alert("please enter something");
      return;
    }
    if (todos.some(({ title }) => title === value)) {
      alert(`Title: ${value} already exists`);
      return;
    }
    const newTodo = await APIHelper.createToDo(value);
    setToDos([...todos, newTodo]);
  };

  // Delete ToDo by ID
  const deleteToDoWithId = async (id) => {
    try {
      await APIHelper.deleteToDoWithId(id);
      setToDos(todos.filter(({ _id: i }) => id !== i));
    } catch (err) {}
  };

  //Filter ToDo by state
  const filterToDoStatus = async (statusToDo) => {
    try {
      await APIHelper.filterToDoStatus(statusToDo);
      setVisibleToDos(todos.filter(({ isDone: i }) => statusToDo === i));
    } catch (err) {}
  };

  // Delete complited ToDo
  const deleteComplitedToDo = async (e) => {
    try {
      e.stopPropagation();
      await APIHelper.deleteComplitedToDo();
    } catch (err) {}
    fetchTodoAndSetToDos();
  };

  //Change ToDo state
  const changeToDoStatus = async (e, id) => {
    e.stopPropagation();
    await APIHelper.changeToDoStatus(id);
    fetchTodoAndSetToDos();
  };

  function handleChangeCountActive() {
    const toDoIsDone = filterToDoStatus(false);
    const newCount = toDoIsDone.length;
    setCountActive(newCount);
  }

  useEffect(() => {
    fetchTodoAndSetToDos();
  }, []);

  useEffect(() => {
    handleChangeCountActive();
    setVisibleToDos(todos);
  }, [todos]);

  function handleChangeFilter(filter) {
    if (filter==="Active"){
      filterToDoStatus(false)
      
    } 
    if (filter === "Done") {
      filterToDoStatus(true)
    }
    if (filter === "All") {
      setVisibleToDos(todos)
    }

  }

  return (
    <React.Fragment>
      <span className="todo">todos</span>
      <div className="app">
        <div className="flex">
          <InputAddToDo createTodo={createTodo} />
        </div>
        <div className="flex">
          {visibleTodos.map((todo) => (
            <ToDo
              key={todo._id}
              handleRemove={deleteToDoWithId}
              handleClickChangeStatus={changeToDoStatus}
              todo={todo}
            />
          ))}
        </div>

        <div className="flex">
          <FilterToDoPanel
            count={countActive}
            handleChangeFilter={handleChangeFilter}
            handleClickDelCompl={deleteComplitedToDo}
          />
        </div>
      </div>
    </React.Fragment>
  );
}


export default App;
