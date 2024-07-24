import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="header-content">
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <img
                src="/assets/poll-pal-icon.png"
                alt="Poll Pal Logo"
                className="logo"
              ></img>
            </Link>
            <h1 className="header-title">
              <span className="poll">Poll</span>
              <span className="pal">Pal</span>
            </h1>
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
              {/* <button className="sign-in-btn">Sign in</button>
              <button className="register-btn">Register</button> */}
              {/* <Link to="/login" className="link-button">
              <button className="animated-button">Sign in</button>
              </Link>
              <Link to="/register" className="link-button">
              <button className="animated-button">Register</button>
              </Link> */}
              {localStorage.getItem("token") ? (
                <p>user</p>
              ) : (
                <>
                  <Link to={`/login`} className="sign-in-link">
                    <button className="animated-button">Sign in</button>
                  </Link>
                  {/* <button className="animated-button">Register</button> */}
                  <Link to="/register" className="link-button">
                    <button className="animated-button">Register</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
