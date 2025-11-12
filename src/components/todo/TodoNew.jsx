import { useState } from "react";

const TodoNew = (props) => {
    const [inputValue, setInputValue] = useState("");
    const { addNewTodo } = props;
    const handleClick = () => {
        addNewTodo(inputValue);
        setInputValue("");
    }
    const handleOnChange = (value) => {
        setInputValue(value);
    }
    return (
        <div className="todo-new">
            <input type="text" placeholder="Enter your task" value={inputValue} onChange={(event) => handleOnChange(event.target.value)} />
            <button onClick={() => handleClick()}>Add</button>
        </div>
    );
}
export default TodoNew;