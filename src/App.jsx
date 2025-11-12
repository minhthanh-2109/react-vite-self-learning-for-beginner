import TodoNew from "./components/todo/TodoNew";
import TodoData from "./components/todo/TodoData";
import TodoImage from "./components/todo/TodoImage";
import "./components/todo/todo.css";
import "./index.css";
import { useState } from "react";
const App = () => {
  const [toDoList, setToDoList] = useState([
    {
      id: 1,
      name: "Learning React"
    },
    {
      id: 2,
      name: "Learning React 2"
    },
  ]);
  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const addNewTodo = (name) => {
    const newItem = {
      id: randomIntFromInterval(1, 10000000),
      name: name
    }
    if (newItem.name !== "") {
      setToDoList([...toDoList, newItem])
    } else {
      alert('Please enter your task');
    }

  }



  return (
    <div className="todo-container">
      <div className="todo-title">
        <h2>Todo List</h2>
      </div>
      <TodoNew addNewTodo={addNewTodo} />
      <TodoData toDoList={toDoList} />
      <TodoImage />
    </div>
  )
}

export default App
