import { Table, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import BookDetail from './book.detail.drawer';
import BookUpdate from './book.update.modal';
import { deleteBookAPI } from '../../services/api.service';
const BookTable = (props) => {
    const { books, current, setCurrent, pageSize, setPageSize, total, loadBooks, isLoadingTable } = props;
    const [bookCurrentDetail, setBookCurrentDetail] = useState();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [bookUpdate, setBookUpdate] = useState();
    const [messageApi, holder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false);

    // const [isLoading, setIsLoading] = useState(false);

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

    }
    const cancel = e => {
        console.log(e);
        messageApi.error('Action canceled');
    };
    const handleDeleteBook = async (_id) => {
        setIsLoading(true);
        const res = await deleteBookAPI(_id);
        if (res.data) {
            message.success('Delete book successfully');
        }
        await loadBooks();
        setIsLoading(false);
    }

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
            title: 'ID',
            dataIndex: '_id',
            render: (_, record) => {
                return (

                    <a onClick={() => {
                        setBookCurrentDetail(record),
                            setDrawerOpen(true),
                            console.log(bookCurrentDetail)
                    }} href='#'>{record._id}</a>
                );
            }

        },

        {
            title: 'Title',
            dataIndex: 'mainText',

        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (value) =>
                value?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })

        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',

        },
        {
            title: 'Author',
            dataIndex: 'author',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <div style={{ display: "flex", gap: "20px" }}>
                        <EditOutlined
                            onClick={() => {
                                setIsModalUpdateOpen(true),
                                    setBookUpdate(record),
                                    console.log(bookUpdate)
                            }}
                            style={{ cursor: "pointer", color: "blue" }} />
                        <>
                            {holder}
                            <Popconfirm
                                title="Delete User"
                                description="Are you sure to delete this user?"
                                onConfirm={() => { handleDeleteBook(record._id) }}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                                loading={isLoading}
                            >
                                <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                            </Popconfirm>
                        </>
                    </div>
                );
            },
        },
    ];
    return (
        <>
            <Table
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} out of {total} books</div>) }
                    }}
                loading={isLoadingTable}
                onChange={onChange}
                dataSource={books} columns={columns} rowKey={'_id'}

            />
            <BookDetail
                bookCurrentDetail={bookCurrentDetail}
                setBookCurrentDetail={setBookCurrentDetail}
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                loadBooks={loadBooks}
            />
            <BookUpdate
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                bookUpdate={bookUpdate}
                setBookUpdate={setBookUpdate}
                loadBooks={loadBooks}
            />
        </>

    );
}
export default BookTable;