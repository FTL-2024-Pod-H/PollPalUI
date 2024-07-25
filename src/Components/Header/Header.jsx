import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";
import Modal from "react-modal";
import axios from "axios"; // Import axios for API requests


const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // controlling visibility of modal
  // storing form data for edit profile modal
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();



  useEffect(() => {
    // const payload = decodeJWT(localStorage.getItem("token"));
    // setUserAvatar(getUserAvatar(payload.userName));
    // fetchUserData(payload.userName);

    const token = localStorage.getItem("token");

    if (token) {
      const payload = decodeJWT(token);
      console.log("payload", payload)
  
      if (payload) {
        setUserAvatar(getUserAvatar(payload.userName));
        fetchUserData(payload.userName);
      } else {
        console.error("Invalid token payload");
        // Handle invalid token case (e.g., redirect to login)
        navigate("/login");
      }
    } else {
      console.error("No token found");
      // Handle missing token case (e.g., redirect to login)
      navigate("/login");
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

  const fetchUserData = async (username) => {
    /**
     * Function to fetch user data from backend based on the username
     */
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${username}`
      );
      const user = response.data;
      setFormData({
        name: user.name,
        username: user.username,
        password: "",
        address: user.address,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // function to handle changes in input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle saving changes in the edit profile form
  const handleSaveChanges = async () => {
    try {
      // Make an API PUT request to update user data in the backend
      const response = await axios.put(
        `http://localhost:3000/users/${formData.username}`,
        formData
      );
      console.log("Saved changes:", response.data);
      // Update local state or give feedback to user as needed
    } catch (error) {
      console.error("Error saving changes:", error);
    }
    // Close the modal after saving changes
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem("token");
    navigate("/");
  };
  // function decodeJWT(token) {
  //   const base64Url = token.split(".")[1];
  //   const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  //   const jsonPayload = decodeURIComponent(
  //     atob(base64)
  //       .split("")
  //       .map((c) => {
  //         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  //       })
  //       .join("")
  //   );

  //   return JSON.parse(jsonPayload);
  // }

  function decodeJWT(token) {
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
    // return `https://robohash.org/${username}.png?set=set1`;
    return `https://ui-avatars.com/api/?name=${username}&background=random`;
  }

  return (
    <>
      <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="header-content" id="div">
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

              {/* IF THE USER IS LOGIN*/}
              {localStorage.getItem("token") ? (
                <>
                  <button onClick={handleLogout} className="animated-button">
                    Sign out
                  </button>
                  {/* <p>user</p> */}
                  <img
                    // src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    // alt="Default User"
                    src={userAvatar}
                    alt="User Avatar"
                    className="user-image"
                    onClick={() => {console.log("clicked"); setIsModalOpen(true)}}
                  />

                  <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    contentLabel="Edit Profile"
                    className="modal"
                    overlayClassName="overlay"
                  >
                    <h2>Edit Profile</h2>
                    <form className="edit-prodile-form">
                      <label>
                        Name:
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </label>
                      <label>
                        Username:
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                        />
                      </label>
                      <label>
                        Password:
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                      </label>
                      <label>
                        Address:
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </label>
                      <div className="modal-buttons">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Close
                        </button>
                        <button type="button" onClick={handleSaveChanges}>
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </Modal>
                </>
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
