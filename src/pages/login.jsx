import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Col, Divider, message, notification } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useNavigate, Link } from 'react-router-dom';
import { logInAPI } from '../services/api.service';
import { useContext, useState } from 'react';
import { AuthContext } from '../components/context/auth.context';

const LoginPage = () => {
    const [form] = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const submitFormWithEnter = (event) => {
        if (event.key === 'Enter');
        form.submit();
    }

    const onFinish = async (values) => {
        console.log('check values >>>', values);
        setIsLoading(true);
        const res = await logInAPI(values.email, values.password);
        if (res.data) {
            message.success("Login successfully");
            localStorage.setItem('access_token', res.data.access_token);
            setUser(res.data.user);
            navigate('/');

        } else {
            notification.error({
                message: 'Error login',
                description: JSON.stringify(res.message)
            });
        }
        setIsLoading(false);
    }
    return (
        <Row justify={'center'} style={{ marginTop: '50px' }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: '15px',
                    margin: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                }}>
                    <legend style={{ color: 'black', fontWeight: '600', fontSize: '30px' }} >Sign in</legend>
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
                        style={{ margin: '10px' }}
                    >

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!'
                                },
                                {
                                    type: 'email',
                                    message: 'Wrong format email'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password onKeyDown={(event) => submitFormWithEnter(event.key)} />
                        </Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button
                                loading={isLoading}
                                type="primary"
                                onClick={() => form.submit()}>
                                Log in
                            </Button>
                            <div style={{ textAlign: 'center' }}><Link to='/'> Go to home page <ArrowRightOutlined /></Link></div>
                        </div>
                        <Divider />
                        <div style={{ textAlign: 'center' }}>Do not have account? <Link to='/register'>Go to register Page</Link></div>
                    </Form>
                </fieldset>


            </Col>
        </Row>

    )
}
export default LoginPage