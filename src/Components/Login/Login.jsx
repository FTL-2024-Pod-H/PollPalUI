import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PROD_LINK = import.meta.env.VITE_PROD_LINK;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get the previous location
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) { 
      navigate("/")
    }
  }, [navigate]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleLogin();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [username, password]);

  // handle login
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${PROD_LINK}/users/login`, {
        username,
        password,
      });

      //store the token in the localStorage as token
      localStorage.setItem("token", response.data.token);
      // Navigate to the previous location or homepage if no previous location is available
      navigate(from, { replace: true });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid username or password");
      } else {
        toast.error("Signin failed, please try again later");
      }
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true}/>
      <h1>Sign in to PollPal</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="animated-button">Sign in</button>
      {/* <button onClick={() => navigate("/register")}>Go to register</button> */}
      <p className="signup">
        {" "}
        Don&apos;t have an account?{" "}
        <a rel="noopener noreferrer" href="/register" class="">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
