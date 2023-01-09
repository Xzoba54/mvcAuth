import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Nav = ({ isLoggedIn, handleSetIsLoggedIn }) => {
  const navLinkStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "600" : "500",
    };
  };

  const navigate = useNavigate();

  const logout = async () => {
    const payload = {
      token: localStorage.getItem("refreshToken"),
    };
    try {
      await axios.post("http://localhost:5000/api/v1/auth/logout", payload, {
        headers: { Authorization: `Bearer: ${localStorage.getItem("accessToken")}` },
      });

      // handleSetIsLoggedIn(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    } catch {
      handleSetIsLoggedIn(false);
    }
  };

  return (
    <header>
      <nav>
        <ul className="links">
          {isLoggedIn ? (
            <>
              <NavLink style={navLinkStyle} to="/">
                <div className="link">
                  <span>Home</span>
                </div>
              </NavLink>
              <NavLink style={navLinkStyle} to="/dashboard">
                <div className="link">
                  <span>Dashboard</span>
                </div>
              </NavLink>
              <NavLink style={navLinkStyle} to="/account">
                <div className="link">
                  <span>My Account</span>
                </div>
              </NavLink>
              <NavLink onClick={logout}>
                <div className="link">
                  <span>Logout</span>
                </div>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink style={navLinkStyle} to="/login">
                <div className="link">
                  <span>Login</span>
                </div>
              </NavLink>
              <NavLink style={navLinkStyle} to="/createAccount">
                <div className="link">
                  <span>Create Account</span>
                </div>
              </NavLink>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
