import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../apicalls/users";

function Login() {
  const navigate = useNavigate()

  const submitForm = async (value) => {
    try {
      const response = await LoginUser(value);

      if (response.success) {
        message.success(response.message);

        localStorage.setItem("token", response.token);

        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/')
    }
  } , [])

  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Welcome to Turf Hub</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={submitForm}>
              <Form.Item
                label="Email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required!" }]}
              >
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                  autoComplete="username"
                ></Input>
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter the password"
                  autoComplete="current-password"
                ></Input>
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                Not registered yet? <Link to="/register">Register now</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
}

export default Login;