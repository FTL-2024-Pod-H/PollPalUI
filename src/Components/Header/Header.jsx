import React, {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";


const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) { //when you want the color to change
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img
              src="/assets/poll-pal-icon.png"
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
        <button class="cssbuttons-io">
          <span>Sign In</span>
        </button>
          {/* <button className="register-btn">Register</button> */}
        </div>
        </div>
      </header>
    </>
  );
};

export default Header;