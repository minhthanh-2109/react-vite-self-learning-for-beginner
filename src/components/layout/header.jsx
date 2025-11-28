import { Menu } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, HomeOutlined, BookOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from "react";
const Header = () => {
    const items = [
        {
            label: <Link to={"/"}>Home</Link >,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UserOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <BookOutlined />,
        },
        {
            label: 'Setting',
            key: 'setting',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to={'/login'} >Login</Link>,
                    key: 'logIn'
                },
                {
                    label: 'Sign out',
                    key: 'signOut'
                },
            ]
        }
    ];
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />

    );
}
export default Header;