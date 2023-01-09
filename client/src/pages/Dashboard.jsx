import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/users/all", null, {
        headers: { Authorization: `Bearer: ${localStorage.getItem("accessToken")}` },
      });

      const { users } = res.data;
      setUsers(users);
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="dashboard">
      <table>
        <tr>
          <td>Users</td>
        </tr>
        <tr>
          <td>Id</td>
          <td>Name</td>
          <td>Email</td>
          <td>Role</td>
        </tr>
        {users.map((user) => (
          <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Dashboard;
