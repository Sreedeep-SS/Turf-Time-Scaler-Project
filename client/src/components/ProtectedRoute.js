import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loadersSlice";
import { getCurrentUser } from "../apicalls/users";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { Layout, Menu, message } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);

  console.log("StateUser   ", user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    {
      key: "home",
      label: "Home",
      icon: <HomeOutlined />,
    },

    {
      key: "profile",
      label: `${user ? user.name : "Guest"}`,
      icon: <UserOutlined />,
      children: [
        {
          key: "my-profile",
          label: "My Profile",
          icon: <ProfileOutlined />,
        },
        {
          key: "logout",
          label: "Log out",
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await getCurrentUser();
      if (response.success) {
        dispatch(setUser(response.data))
        dispatch(hideLoading());
        // if(!response.data.isAdmin){
        //   alert("You are not an admin")
        //   navigate('/')
        // }

      } else {
        dispatch(setUser(null));
        alert(response.message);
        dispatch(hideLoading());
        localStorage.clear()
      }
    } catch (error) {
      dispatch(hideLoading());
      dispatch(setUser(null));
      alert("Exception while getting current session", error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <>
      <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              height: "80px",
              padding: "0 24px", 
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Turf
            </h3>
            <Menu 
              theme="dark" 
              mode="horizontal" 
              items={navItems} 
              onClick={({ key }) => {
                if (key === "home") navigate("/");
                if (key === "my-profile") navigate(user.isAdmin ? "/admin" : "/profile");
                if (key === "logout") {
                  localStorage.removeItem("token");
                  navigate("/login");
                }
              }}
            />;
          </Header>

          <div style={{ minHeight: 1000, background: "#fff" }}>
            {children}
          </div>
        </Layout>
      </>
    )
  );
}

export default ProtectedRoute;