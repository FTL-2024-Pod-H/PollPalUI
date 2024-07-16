import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="logo">
          <img
            src="public/assets/poll-pal-icon.png"
            alt="Poll Pal Logo"
            className="logo"
          ></img>
          <h1 className="title"> Poll Pal</h1>
        </div>
        <nav className="nav">
          <ul className="nav-links">
            <li className="nav-item">Home</li>
            <li className="nav-item">Map</li>
            <li className="nav-item">Forum</li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <button className="sign-in-btn">Sign in</button>
          <button className="register-btn">Register</button>
        </div>
      </header>
    </>
  );
};

export default Header;
