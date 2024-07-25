import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPasswordChecklist from "react-password-checklist";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmedPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate(); //navigating through different pages
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  //handle register and toast errors
  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    // if (password !== confirmPassword) {
    //   toast.error("Passwords do not match!");
    //   return;
    // }
    if (!isPasswordValid) {
      toast.error("Password does not meet the checklist requirements.");
      return;
    }
    try {
      // register the user
      const response = await axios.post(
        "http://localhost:3000/users/register",
        { name, username, password, address }
      );
      //login the user
      const loginResponse = await axios.post(
        "http://localhost:3000/users/login",
        { username, password }
      );

      // storing token in localStorage as encrypted token
      localStorage.setItem("token", loginResponse.data.token);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(
          error.response.data.error ||
            "Registration failed: Username may already be taken or invalid."
        );
      } else {
        toast.error("Registration failed, please try again");
      }
    }
  };
  const handleGoogleSignup = () => {
    // This needs to be a full page reload to navigate to the OAuth page
    window.location.href = "http://localhost:3000/auth/login";
  };


  return (
    <div className="register-container">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
      />
      <h1>Welcome to Poll Pal, please register!</h1>
      <input
        type="name"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        /*when user types something it updates the Username*/
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmedPassword(e.target.value)}
      />
      <div className="password-checklist">
        <ReactPasswordChecklist
          rules={["minLength", "specialChar", "number", "capital", "match"]}
          minLength={8}
          value={password}
          valueAgain={confirmPassword}
          onChange={(isValid) => {setIsPasswordValid(isValid)}}
        />
      </div>
      <input
        type="address"
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>

      <div className="social-message">
        <div className="line"></div>
        <p className="message">Sign up with social accounts</p>
        <button onClick={handleGoogleSignup}>Google Login</button>
        <div className="line"></div>
      </div>


    </div>
  );
};

export default Register;
