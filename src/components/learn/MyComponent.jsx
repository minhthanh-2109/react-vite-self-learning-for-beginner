import "./style.css"
const MyComponent = () => {
    const arr = [1, 2, 3];
    const obj = {
        name: "Thanh",
        age: "23"
    }
    return (
        <>
            <div>
                <h3>Anh Thanh dep trai vai ca lin</h3>
            </div>
            <div className="child">
                {JSON.stringify(obj)}
            </div>
        </>

    );
}
export default MyComponent;