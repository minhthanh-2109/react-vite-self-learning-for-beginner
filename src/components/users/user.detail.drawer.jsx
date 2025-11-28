// import React, { useEffect, useState } from 'react';
import { Drawer, notification } from 'antd';
import { Descriptions, Button } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateUserAvatarAPI } from '../../services/api.service';
const UserDetail = (props) => {
    const { drawerOpen, setDrawerOpen, userCurrentDetail, setUserCurrentDetail, loadUser } = props
    // const [id, setId] = useState();
    // const [fullName, setFullName] = useState();
    // const [email, setEmail] = useState();
    // const [phone, setPhone] = useState();
    // const [role, setRole] = useState();

    let id = '';
    let fullName = '';
    let email = '';
    let phone = '';
    let role = '';
    let avt = '';

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    if (userCurrentDetail) {
        id = userCurrentDetail._id;
        fullName = userCurrentDetail.fullName;
        email = userCurrentDetail.email;
        phone = userCurrentDetail.phone;
        role = userCurrentDetail.role;
        avt = userCurrentDetail.avatar;
    }
    const handleOnChangeFile = (event) => {
        const input = event.target;
        if (!input.files || input.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
        input.value = null;
        console.log('check file >>>', file)
        console.log("check preview >>>", preview);
    }
    // useEffect(() => {
    //     console.log('user current detail on Description:>>', userCurrentDetail);
    //     if (userCurrentDetail) {
    //         setId(userCurrentDetail._id);
    //         setFullName(userCurrentDetail.fullName);
    //         setEmail(userCurrentDetail.email);
    //         setPhone(userCurrentDetail.phone);
    //         setRole(userCurrentDetail.role)
    //     }
    // }, [userCurrentDetail]);

    // const showDrawer = () => {
    //     setDrawerOpen(true);
    // };
    const handleUpdateAvt = async () => {
        //step 1: upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if (resUpload.data) {
            const newAvatar = resUpload.data.fileUploaded;
            //step 2: upload user
            const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, id, fullName, phone);
            if (resUpdateAvatar.data) {
                onClose();
                // setUserCurrentDetail(null);
                // setSelectedFile(null);
                // setPreview(null);
                await loadUser();
                notification.success({
                    message: "Update avatar successfully",
                    description: "Update avatar successfully",
                })
            } else {
                notification.error({
                    message: "Error when update avatar",
                    description: JSON.stringify(resUpload.message),
                })
            }
            console.log('check newAvt >>', newAvatar);

        } else {
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message),
            })
        }
        // console.log('check res upload >>> ', resUpload)
    }

    const onClose = () => {
        setDrawerOpen(false);
        setUserCurrentDetail(null);
        setSelectedFile(null);
        setPreview(null);
    };
    const items = [
        {
            label: 'Id',
            children: id,

        },
        {
            label: 'Full Name',

            children: fullName,
        },
        {
            label: 'email',

            children: email,
        },
        {
            label: 'Phone number',

            children: phone,
        },
        {
            label: 'Role',
            children: role,
        },
    ];
    return (
        <>
            <Drawer
                title="User Detail"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                open={drawerOpen}
                width={"55vw"}
            >
                <h3>User Info</h3>
                <br />
                <p>Avatar:</p>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img style={{
                        width: '170px',
                        height: '170px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }} src={preview ? preview : `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${avt}`} alt="Avatar" />
                    <div style={{ display: 'flex', marginTop: '10px', gap: '7px' }}>
                        <label style={{
                            color: 'white',
                            display: 'block',
                            width: 'fit-content',
                            padding: '5px 10px',
                            background: '#0096FF',
                            cursor: 'pointer',
                            border: 'none',
                            borderRadius: '5px',

                        }} htmlFor="btnUpload"> Upload Avatar</label>
                        <input onChange={(event) => handleOnChangeFile(event)} type="file" id='btnUpload' hidden />
                        {preview && <Button onClick={() => handleUpdateAvt()} type='primary'>Save</Button>}
                    </div>
                </div>

                <br />
                <Descriptions layout="vertical" bordered={true} items={items} />
            </Drawer >
        </>
    );

};
export default UserDetail;