import '../../styles/todo.css';
const TodoData = (props) => {
    const { toDoList, handleDeleteClick } = props;
    const handleDelete = (id) => {
        handleDeleteClick(id);
    }
    return (
        <div className="todo-data">
            {toDoList.map((item, index) => {
                return (
                    <div className="todo-item" key={item.id}>
                        <div>{item.name}</div>
                        <button onClick={() => { handleDelete(item.id) }}>Delete</button>
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