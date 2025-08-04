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
      label: (
        <span 
        onClick={() => {
          navigate("/");
        }}>
          Home
          </span>
      ),
      icon: <HomeOutlined />,
    },

    {
      label: `${user ? user.name : " "}`,
      icon: <UserOutlined />,

      children: [
        {
          label: (
            <span
              onClick={() => {
                user.isAdmin ? navigate("/admin") : navigate("/profile");
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link to="/login" onClick={() => localStorage.removeItem("token")}>
              Log out
            </Link>
          ),
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
        if(!response.data.isAdmin){
          alert("You are not an admin")
          navigate('/')
        }

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
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Turf
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems}/>;
          </Header>

          <div style={{ padding: 24, minHeight: 1000, background: "#fff" }}>
            {children}
          </div>
        </Layout>
      </>
    )
  );
}

export default ProtectedRoute;