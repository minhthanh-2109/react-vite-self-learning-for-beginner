import './todo.css';
const TodoData = (props) => {
    const { toDoList } = props;
    console.log(toDoList);
    return (
        <div className="todo-data">
            {toDoList.map((item, index) => {
                return (
                    <div className="todo-item">
                        <div>{item.name}</div>
                        <button>Delete</button>
                    </div >
                );
            })}
            {/* <div>
                {JSON.stringify(toDoList)}
            </div> */}
        </div >
    );
}
export default TodoData;