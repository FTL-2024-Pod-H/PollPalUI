import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import { Troubleshoot } from "@mui/icons-material";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  const [id, setId] = useState(0);
  const [username, setUsername] = useState("");

  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = decodeJWT(token);
      // console.log("payload", payload);
      if (payload) {
        setId(payload.userId);
        setUserAvatar(getUserAvatar(payload.userName));
        setUsername(`@${payload.userName}`);
        console.log(username);
      }
    } else {
      setId(null);
      setUserAvatar("");
    }

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
  }, [localStorage.getItem("token")]);

  useEffect(() => {
    const handleSignOut = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleSignOut);
    return () => {
      document.removeEventListener("mousedown", handleSignOut);
    };
  }, [dropdownRef]);

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
    // console.log("Logging out");
    localStorage.removeItem("token");
    setId(null);
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  function decodeJWT(token) {
    // decodes the JSON web token to returns the profile picture
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }

  function getUserAvatar(username) {
    // returns the URL of the user's avatar image
    return `https://ui-avatars.com/api/?name=${username}&background=random`;
  }

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
                <div className="phone-nav">
                  <img
                    src={userAvatar}
                    alt="User Avatar"
                    className="user-image"
                    onClick={toggleDropdown}
                    // onClick={() => { console.log("clicked");
                    // setIsDropdownOpen(!isDropdownOpen);}}
                  />
                  <p className="username open" id="phone-username">
                    {username}
                  </p>
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-menu" ref={dropdownRef}>
                    <p className="username open">{username}</p>
                    <button onClick={handleLogout} className="animated-button">
                      Sign out
                    </button>
                  </div>
                )}
                <div className="menu-signout open">
                  <button onClick={handleLogout} className="animated-button">
                    Sign out
                  </button>
                </div>
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
