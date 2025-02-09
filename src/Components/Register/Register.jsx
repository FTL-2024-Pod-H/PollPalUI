// Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordStrengthBar from "react-password-strength-bar";

const PROD_LINK = import.meta.env.VITE_PROD_LINK;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmedPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the previous location
  const from = location.state?.from?.pathname || "/";

  // Handle register and toast errors
  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (passwordStrength < 3) {
      toast.error("Password not strong enough.");
      return;
    }

    try {
      await axios.post(`${PROD_LINK}/users/register`, {
        name,
        username,
        password,
        address: " ",
      });
      const loginResponse = await axios.post(`${PROD_LINK}/users/login`, {
        username,
        password,
      });
      localStorage.setItem("token", loginResponse.data.token);
      // Navigate to the previous location or homepage if no previous location is available
      const from = location.state?.from || "/";
      navigate(from);
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

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmedPassword(newConfirmPassword);
    validatePassword(password, newConfirmPassword);
  };

  const validatePassword = (password, confirmPassword) => {
    const minLength = password.length >= 6;
    const specialChar = /[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|-]/.test(password);
    const number = /\d/.test(password);
    const capital = /[A-Z]/.test(password);
    const match = password === confirmPassword;

    setIsPasswordValid(minLength && specialChar && number && capital);
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|-]/.test(password)) strength += 1;
    return strength;
  };

  return (
    <div className="register-container">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
      />
      <h1>Welcome to PollPal, please register!</h1>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
      />
      <div className="password-strength-bar">
        <PasswordStrengthBar
          className="bar"
          password={password}
          minLength={6}
          scoreWords={["Too Weak", "Weak", "Okay", "Good", "Strong"]}
          onChangeScore={(score) => setPasswordStrength(score)}
        />
      </div>
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={handleConfirmPasswordChange}
      />
      {/* <input
        type="text"
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
      /> */}
      <div className="register-buttons">
        <button onClick={handleRegister} className="animated-button">Register</button>
        {/* <button onClick={() => navigate("/login")} className="animated-button">Go to Sign in</button> */}
      </div>
      <div>
        <p className="signup">
        {" "}
        {/* Don&apos;t have an account?{" "} */}
        Already have an account?{" "}
        <a rel="noopener noreferrer" href="/login" class="">
          Sign in
        </a>
      </p>
      </div>
      <div className="social-message">
        <div className="line"></div>
        
        <p className="message">Sign in with social accounts coming soon</p>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default Register;
