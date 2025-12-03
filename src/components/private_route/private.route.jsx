import { notification, Spin } from "antd";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.id) {
            notification.error({
                message: "Login required",
                description: "You must login to view this page",
                duration: 3,  // <= thời gian thông báo
            });

            setTimeout(() => {
                navigate("/login");
            }, 3000);
        }
    }, [user]);

    // Tránh lỗi: Không return gì khi user chưa login
    if (!user || !user.id)
        return <>
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
            }}>
                <Spin size="large"></Spin>
            </div>

        </>;

    return <>{props.children}</>;
};

export default PrivateRoute;
