import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { Outlet } from "react-router-dom";
import { getUserInfoAPI } from "./services/api.service";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const res = await getUserInfoAPI();
    if (res.data) {
      setUser(res.data.user);
    }
    setIsAppLoading(false);
  }
  return (
    <>
      {isAppLoading === true ?
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(255,255,255,0.7)",
          zIndex: 9999
        }}>
          <Spin size="large" />
        </div>

        :
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      }

    </>

  )
}

export default App
