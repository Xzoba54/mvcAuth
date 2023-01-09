import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Home = ({ handleSetIsLoggedIn }) => {
  const [name, setName] = useState("");

  // const navigate = useNavigate();

  // const getData = async () => {
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/v1/pages/home", null, {
  //       headers: { Authorization: `Bearer: ${localStorage.getItem("accessToken")}` },
  //     });

  //     const { name } = res.data;
  //     setName(name);
  //   } catch {
  //     localStorage.removeItem("accessToken");
  //     localStorage.removeItem("refreshToken");
  //     handleSetIsLoggedIn(false);
  //     navigate("/login");
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/pages/home", null, {
        headers: { Authorization: `Bearer: ${localStorage.getItem("accessToken")}` },
      });

      const { name } = res.data;
      setName(name);
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  };

  useEffect(() => {
    getData();
  });

  return (
    <div>
      <h1>Welcome, {name}</h1>
    </div>
  );
};

export default Home;
