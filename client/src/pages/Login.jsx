import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import auth from "../auth/auth";
import { useEffect } from "react";

const Login = ({ isLoggedIn, handleSetIsLoggedIn }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const isAuth = async () => {
    const { success } = await auth();
    handleSetIsLoggedIn(success);
  };

  useEffect(() => {
    isAuth();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      name: name,
      password: password,
    };
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", payload, {
        withCredentials: true,
      });

      const { accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      handleSetIsLoggedIn(true);
    } catch {
      setLoginError(true);
    }
  };

  const handleName = (name) => {
    setName(name);
  };

  const handlePassword = (password) => {
    setPassword(password);
  };

  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <div className="form">
      <h1>Login</h1>
      <div className="row">
        <input type="text" style={{ borderBottom: loginError ? "1px solid red" : "" }} onChange={(e) => handleName(e.target.value)} placeholder="Name..." />
      </div>
      <div className="row">
        <input type="password" style={{ borderBottom: loginError ? "1px solid red" : "" }} onChange={(e) => handlePassword(e.target.value)} placeholder="Password..." />
      </div>
      <button onClick={handleSubmit}>Log in</button>
    </div>
  );
};

export default Login;
