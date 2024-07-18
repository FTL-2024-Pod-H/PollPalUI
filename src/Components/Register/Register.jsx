import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
  // handle register
  const handleRegister = async () => {
    try {
      // Simulate a successful registration response
      const response = { data: { message: "Registration successful" } };
      console.log(response.data.message);

      // Simulate a successful login response
      const loginResponse = { data: { token: "mock-token" } };
      localStorage.setItem("token", loginResponse.data.token);

      // Navigate to another page, e.g., the login page or dashboard
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Try again");
    }
  };

  return (
    <div className="register-container">
      <h1>Welcome to Poll Pal, please register!</h1>
      <input
      type="text"
      placeholder="Username"
      onChange={(e) => setUsername(e.target.value)}
      />
      <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <button onClick={() => navigate("/login")}>Go to login</button>
    </div>
  );
};

export default Register;
