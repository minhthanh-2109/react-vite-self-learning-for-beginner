import { Button, Input, notification, Modal } from 'antd';
import { useState } from "react";
import { createUserAPI } from '../../services/api.service';

const UserForm = (props) => {
    const { loadUser } = props;
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    //  Close model and clear data
    const closeAndClearModelData = () => {
        setIsModalOpen(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
    }
    //  Handle Submit button

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                message: "Create user",
                description: "Create user successfully"
            });
            closeAndClearModelData();
            await loadUser();
        } else {
            notification.error({
                message: "Error when create user",
                description: JSON.stringify(res.message)
            })
        }
        console.log("check user >>", res.data);
    }



    return (
        <div className='user-form' style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", gap: "15px", flexDirection: "column", color: "black", fontWeight: "400" }}>
                {/* <div>
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
                </div> */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <h2>User Table</h2>
                    </div>
                    <div>
                        <Button onClick={() => { setIsModalOpen(true) }} type='primary'>Create user</Button>
                    </div>
                </div>
            </div>
            <Modal
                title="Enter user information"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => { handleSubmitBtn() }}
                onCancel={() => { closeAndClearModelData() }}
                maskClosable={false}
                okText={"Create"}
            // destroyOnClose
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column", color: "black", fontWeight: "400" }}>
                    <div>
                        <span>Full Name</span>
                        <Input placeholder="Full name" value={fullName} onChange={(event) => { setFullName(event.target.value) }} />
                    </div>
                    <div>
                        <span>Email</span>
                        <Input placeholder="Email" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                    </div>
                    <div>
                        <span>Password</span>
                        <Input.Password placeholder="Password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                    </div>
                    <div>
                        <span>Phone number</span>
                        <Input placeholder="Phone number" value={phone} onChange={(event) => { setPhone(event.target.value) }} />
                    </div>
                </div>
            </Modal>
        </div>

    );
}
export default UserForm;