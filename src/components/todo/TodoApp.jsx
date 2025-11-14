import TodoNew from "./TodoNew";
import TodoData from "./TodoData";
import TodoImage from "./TodoImage";
import "../../styles/todo.css";
import "../../styles/global.css";
import { useState } from "react";
const TodoApp = () => {
    const [toDoList, setToDoList] = useState([
        // {
        //   id: 1,
        //   name: "Learning React"
        // },
        // {
        //   id: 2,
        //   name: "Learning React 2"
        // },
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
    const handleDeleteClick = (id) => {
        console.log(id);
        // toDoList.remove(id);
        const newTodoList = toDoList.filter((item => item.id !== id));
        setToDoList(newTodoList);
    }

    return (
        <div className="todo-container">
            <div className="todo-title">
                <h2>Todo List</h2>
            </div>
            <TodoNew addNewTodo={addNewTodo} />

            {toDoList.length > 0 ?
                <TodoData toDoList={toDoList} handleDeleteClick={handleDeleteClick} />
                :
                <TodoImage />
            }

            {/* {toDoList.length > 0 &&
        <TodoData toDoList={toDoList} />}
      {toDoList.length === 0 &&
        <TodoImage />
      } */}
        </div>
    );
}
export default TodoApp;