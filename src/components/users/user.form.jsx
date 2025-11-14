import { Button, Input } from 'antd';
import axios from 'axios';
import { useState } from "react";

const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");


    const handleClickBtn = () => {
        const BACKEND_URL = "http://localhost:8080/api/v1/user";
        const data = {
            fullName: fullName,
            email: email,
            password: password,
            phone: phone
        }
        axios.post(BACKEND_URL, data);
        console.log({ fullName, email, password, phoneNumber })

    }
    return (
        <div className='user-form' style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Full Name</span>
                    <Input placeholder="Full name" onChange={(event) => { setFullName(event.target.value) }} />
                </div>
                <div>
                    <span>Email</span>
                    <Input placeholder="Email" onChange={(event) => { setEmail(event.target.value) }} />
                </div>
                <div>
                    <span>Password</span>
                    <Input.Password placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input placeholder="Phone number" onChange={(event) => { setPhone(event.target.value) }} />
                </div>
                <div>
                    <Button onClick={handleClickBtn} type='primary'>Create user</Button>
                </div>
            </div>

        </div>

    );
}
export default UserForm;