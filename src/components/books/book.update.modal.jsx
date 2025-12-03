
import { Input, notification, Modal, Form, InputNumber, Select, message } from 'antd';
import { useState, useEffect } from "react";
import { handleUploadFile, updateBookAPI } from '../../services/api.service';
const BookUpdate = (props) => {
    const { loadBooks, isModalUpdateOpen, setIsModalUpdateOpen, bookUpdate, setBookUpdate } = props;
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (bookUpdate && bookUpdate._id) {
            form.setFieldsValue({
                _id: bookUpdate._id,
                mainText: bookUpdate.mainText,
                author: bookUpdate.author,
                category: bookUpdate.category,
                price: bookUpdate.price,
                quantity: bookUpdate.quantity,
            });
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookUpdate.thumbnail}`);
        }
    }, [bookUpdate]);

    const resetAndClosedModal = () => {
        form.resetFields();
        setSelectedFile(null);
        setPreview(null);
        setBookUpdate(null);
        setIsModalUpdateOpen(false);
    };

    const handleSubmitBtn = async (values) => {
        setIsLoading(true);
        if (!selectedFile && !preview) {
            notification.error({
                message: "Error update book",
                description: "Please upload thumbnail picture"
            });
            return;
        }
        let newThumbnail = "";
        if (!selectedFile && preview) {
            newThumbnail = bookUpdate.thumbnail;
        } else {
            const resUpload = await handleUploadFile(selectedFile, "book");
            //success
            if (resUpload.data) {
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message),
                });
                return;
            }
        }
        //step 2: update book
        const { _id, mainText, author, price, quantity, category } = values;
        const resBook = await updateBookAPI(
            _id,
            newThumbnail,
            mainText,
            author,
            price,
            quantity,
            category);
        if (resBook.data) {
            resetAndClosedModal();
            await loadBooks();
            message.success('Book updated');
        }
        setIsLoading(false);
    };

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
    return (
        <div className='user-form' style={{ margin: "20px 0" }}>
            <Modal
                title="Enter book information"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalUpdateOpen}
                onOk={() => { form.submit() }}
                onCancel={() => { resetAndClosedModal() }}
                maskClosable={false}
                loading={isLoading}
                okText={"UPDATE"}
                destroyOnClose
            >

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitBtn}
                >
                    <Form.Item
                        label="ID"
                        name="_id"
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Title"
                        name="mainText"
                        rules={[{ required: true, message: "Title Required" }]}
                    >
                        <Input placeholder="Book title" />
                    </Form.Item>
                    <Form.Item
                        label="Author"
                        name="author"
                        rules={[{ required: true, message: "Author Required" }]}
                    >
                        <Input placeholder="Author name" />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: "Price Required" }]}
                    >
                        <InputNumber
                            min={0}
                            style={{ width: "100%" }}
                            placeholder="Price"
                            addonAfter={'đ'}
                            formatter={(value) =>
                                value.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                            }
                            parser={(value) => value.replace(/\./g, "")}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[{ required: true, message: "Quantity Required" }]}
                    >
                        <InputNumber
                            min={0}
                            style={{ width: "100%" }}
                            placeholder="Quantity"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: "Category Required" }]}
                    >
                        <Select style={{
                            width: "100%"
                        }}
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' }
                            ]}
                        />
                    </Form.Item>
                </Form>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <div>Thumbnail Picture</div>
                    <div style={{ marginTop: '10px' }}>
                        <label style={{
                            color: 'white',
                            display: 'block',
                            width: 'fit-content',
                            padding: '5px 10px',
                            background: '#0096FF',
                            cursor: 'pointer',
                            border: 'none',
                            borderRadius: '5px',

                        }} htmlFor="btnUpload"> Upload</label>
                        <input onChange={(event) => handleOnChangeFile(event)} type="file" id='btnUpload' hidden />
                    </div>
                    <img style={{
                        marginTop: '15px',
                        width: '150px',
                        height: '150px',
                        objectFit: 'cover'
                    }}
                        src={
                            preview
                        }
                    />
                </div>
            </Modal>
        </div>
    );
}
export default BookUpdate;