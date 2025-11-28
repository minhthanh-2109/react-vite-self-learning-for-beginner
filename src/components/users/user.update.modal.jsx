import { Input, notification, Modal } from 'antd';
import { updateUserAPI } from '../../services/api.service';
import { useEffect, useState } from 'react';

const UserUpdateModal = (props) => {

    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;
    const [fullName, setFullName] = useState("");
    const [id, setId] = useState("");
    const [phone, setPhone] = useState("");

    //next data != previous data
    useEffect(() => {
        console.log("check user props >>>", dataUpdate);
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }

    }, [dataUpdate]);

    //  Close model and clear data
    const closeAndClearModelData = () => {
        setIsModalUpdateOpen(false);
        setDataUpdate(null);
    }
    //  Handle Submit button

    const handleUpdateBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone);
        if (res.data) {
            notification.success({
                message: "Update user",
                description: "Update user successfully"
            });
            closeAndClearModelData();
            await loadUser();

        } else {
            notification.error({
                message: "Error when update user",
                description: JSON.stringify(res.message)
            })
        }
        console.log("check user >>", res.data);
    }


    return (
        <Modal
            title="Edit User"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalUpdateOpen}
            onOk={() => { handleUpdateBtn(id, fullName, phone) }}
            onCancel={() => { closeAndClearModelData() }}
            maskClosable={false}
            okText={"Update"}
        // destroyOnClose
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column", color: "black", fontWeight: "400" }}>
                <div>
                    <span>Id</span>
                    <Input placeholder="Email" value={id} disabled />
                </div>
                <div>
                    <span>Full Name</span>
                    <Input placeholder="Full name" value={fullName} onChange={(event) => { setFullName(event.target.value) }} />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input placeholder="Phone number" value={phone} onChange={(event) => { setPhone(event.target.value) }} />
                </div>
            </div>
        </Modal>
    );
}
export default UserUpdateModal;