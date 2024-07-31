import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);


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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem("token");
    navigate("/");
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };



  return (
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
        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          // onClick={() => {{toggleMenu} {onclose}}}
        >
          &#9776;
        </button>
        <div 
          ref={menuRef}
          className={`nav-auth-container ${menuOpen ? "open" : ""}`}
        >
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
            {localStorage.getItem("token") ? (
                <>
                  <Link to={`/`} className="sign-in-link">
                    <button onClick={handleLogout} className="animated-button">Sign out</button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={`/login`} className="sign-in-link">
                    <button className="animated-button">Sign in</button>
                  </Link>
                  <Link to="/register" className="sign-in-link">
                    <button className="animated-button">Register</button>
                  </Link>
                </>
              )}

          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
