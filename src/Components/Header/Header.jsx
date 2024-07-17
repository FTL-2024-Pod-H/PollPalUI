import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img
              src="public/assets/poll-pal-icon.png"
              alt="Poll Pal Logo"
              className="logo"
            ></img>
          </Link>
          <h1 className="title"> Poll Pal</h1>
        </div>
        <div className="nav-auth-container">
        <nav className="nav">
          <ul className="nav-links">
            <li className="nav-item">
                <Link to={`/`} className="home-name-link">
                  Home
                </Link>
            </li>
            <li className="nav-item">
              <Link to={`/map`} className="map-name-link">
                  Map
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/forum`} className="forum-name-link">
                  Forum
              </Link>
            </li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <button className="sign-in-btn">Sign in</button>
          <button className="register-btn">Register</button>
        </div>
        </div>
      </header>
    </>
  );
};

export default Header;
