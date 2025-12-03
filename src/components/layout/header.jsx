import { Menu, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserOutlined, HomeOutlined, BookOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { logOutAPI } from "../../services/api.service";
const Header = () => {
    const { user, setUser } = useContext(AuthContext);
    const [current, setCurrent] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log(location);
        if (location && location.pathname) {
            const allRoutes = ['users', 'books'];
            const currentRoute = allRoutes.find(items => `/${items}` === location.pathname);
            if (currentRoute) {
                setCurrent(currentRoute);
            } else {
                setCurrent('home');
            }
        }
    }, [location])
    const handleLogOut = async () => {
        const res = await logOutAPI();
        if (res.data) {
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            });
            message.success('Log out successfully');
            navigate("/");
        }
    }
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
        ...(!user.id ? [{
            label: <Link to={"/Login"}>Login</Link>,
            key: 'login',
            icon: <LoginOutlined />,
        }
        ] : []),
        ...(user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'loginUser',
            icon: <UserOutlined />,
            children: [
                {
                    label: <span onClick={() => handleLogOut()}>Sign out</span>,
                    key: 'signOut',
                    icon: <LogoutOutlined />
                },
            ]
        }
        ] : []),
    ];

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />

    );
}
export default Header;