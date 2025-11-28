import { Button, Form, Input, notification, Row, Col, Divider } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { registerUserAPI } from '../services/api.service';
import { useNavigate, Link } from 'react-router-dom';
const RegisterPage = () => {
    const [form] = useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log('check values >>>', values);
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone);
        if (res.data) {
            notification.success({
                message: "Register user successfully",
                description: "Register user successfully",
            });
            navigate('/login');
        } else {
            notification.error({
                message: "Failed to register user",
                description: JSON.stringify(res.message),
            });
        }
    }
    return (
        <Row justify={'center'} style={{ marginTop: '50px' }} >
            <Col xs={24} md={16} lg={8}>
                <Form
                    form={form}
                    layout='vertical'
                    name="basic"
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{ margin: '30px' }}
                >
                    <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Register user</h1>

                    <Form.Item
                        label="Username"
                        name="fullName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{
                            required: true,
                            pattern: new RegExp(/\d+/g),
                            message: "Wrong format!"
                        }]}
                    >
                        <Input />
                    </Form.Item>


                    <div>
                        <Button type="primary" onClick={() => form.submit()}>
                            Register
                        </Button>
                    </div>
                    <Divider />
                    <div>Already have account? <Link to={"/login"}>Go to Login Page</Link></div>

                </Form>
            </Col>
        </Row >

    )
}
export default RegisterPage