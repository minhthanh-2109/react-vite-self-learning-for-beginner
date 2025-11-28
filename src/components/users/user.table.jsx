import { Table, notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UserUpdateModal from './user.update.modal';
import { useState } from 'react';
import UserDetail from './user.detail.drawer';
import { deleteUserAPI } from '../../services/api.service';
import { message, Popconfirm } from 'antd';

const UsersTable = (props) => {
    const { userData, loadUser, current, pageSize, total, setCurrent, setPageSize } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);
    const [userCurrentDetail, setUserCurrentDetail] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [messageApi, holder] = message.useMessage();
    const confirm = e => {
        console.log(e);
        messageApi.success('Click on Yes');
    };
    const cancel = e => {
        console.log(e);
        messageApi.error('Action canceled');
    };

    const handleDeleteUser = async (_id) => {
        const res = await deleteUserAPI(_id);
        if (res.data) {
            notification.success({
                message: "User deleted",
                description: "User deleted successfully"
            });

            await loadUser();
            console.log(userData);
        } else {
            notification.error({
                message: "Error when removing user",
                description: JSON.stringify(res.message)
            })
        }
    }

    const onChange = (pagination, filters, sorter, extra) => {

        // if current page changes, set current page = new current value
        if (pagination && pagination.current) {
            if (+pagination.current != +current) {
                setCurrent(+pagination.current); // dau cong '5' => 5
            }
        }
        // if page size changes, set page size
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize != +pageSize) {
                setPageSize(+pagination.pageSize); // dau cong '5' => 5
            }
        }
        console.log('check >>>', { pagination, filters, sorter, extra });
    };

    const columns = [
        {
            title: 'Row Number',
            dataIndex: 'rowNumber',
            render: (_, record, index) => {
                return (
                    <div>{(index + 1) + (current - 1) * pageSize}</div>
                );
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a onClick={() => {
                        setUserCurrentDetail(record),
                            setDrawerOpen(true)
                    }} href='#'>{record._id}</a>
                );
            },
        },

        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <div style={{ display: "flex", gap: "20px" }}>
                        <EditOutlined onClick={() => {
                            setIsModalUpdateOpen(true),
                                setDataUpdate(record)
                        }} style={{ cursor: "pointer", color: "blue" }} />
                        <>
                            {holder}
                            <Popconfirm
                                title="Delete User"
                                description="Are you sure to delete this user?"
                                onConfirm={() => { handleDeleteUser(record._id) }}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                {/* onClick={() => { handleDeleteUser(record._id) }} */}
                                <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                            </Popconfirm>
                        </>
                    </div>
                );
            },
        },
    ];
    console.log('check user current>>>', userCurrentDetail);
    // console.log("check update data >>>", dataUpdate);
    return (
        <>
            < Table
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} out of {total} users</div>) }
                    }}
                onChange={onChange}
                dataSource={userData} columns={columns} rowKey={"_id"} />
            <UserUpdateModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser} />
            <UserDetail
                userCurrentDetail={userCurrentDetail}
                setUserCurrentDetail={setUserCurrentDetail}
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                loadUser={loadUser} />
        </>

    )
};
export default UsersTable;