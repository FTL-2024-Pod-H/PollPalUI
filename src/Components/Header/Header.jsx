import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // adding dropdown to profile picture
  const [userAvatar, setUserAvatar] = useState(""); // used to get profile picture on header when loggedin
  const [id, setId] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const payload = decodeJWT(token);
      console.log("payload", payload);

      if (payload) {
        setId(payload.userId);
        setUserAvatar(getUserAvatar(payload.userName));
        //fetchUserData(payload.userName);
      }
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
  }, []);

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem("token");
    navigate("/");
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
        <button className="menu-toggle" onClick={toggleMenu}>
          &#9776;
        </button>
        <div className={`nav-auth-container ${menuOpen ? "open" : ""}`}>
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
            {/* <Link to={`/login`} className="sign-in-link">
              <button className="animated-button">Sign in</button>
            </Link>
            <Link to="/register" className="sign-in-link">
              <button className="animated-button">Register</button>
            </Link> */}
            {localStorage.getItem("token") ? (
              <>
                {/* <button onClick={handleLogout} className="animated-button">
                  Sign out
                </button> */}
                <img
                    // src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    // alt="Default User"
                    src={userAvatar}
                    alt="User Avatar"
                    className="user-image"
                    onClick={() => { console.log("clicked");
                    setIsDropdownOpen(!isDropdownOpen);}}/>
                    {isDropdownOpen && (
                  <div className="dropdown-menu">
                    {/* <Link to="#" className="dropdown-item">
                    <button>Edit User</button>
                    </Link> */}
                    <button onClick={handleLogout} className="sign-out">
                      Sign out
                    </button>
                  </div>
                    )}
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