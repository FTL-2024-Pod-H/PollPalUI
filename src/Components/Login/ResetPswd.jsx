import React, { useState } from "react";
import "./ResetPswd.css";
import PasswordStrengthBar from "react-password-strength-bar";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";


const ResetPswd = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    // const navigate = useNavigate();

    const renderBackend = import.meta.env.VITE_RENDER_BACKEND;
    const localhostBackend = import.meta.env.VITE_LOCALHOST_BACKEND;

    const handleRegister = async () => {
        // if (!username || !password || !confirmPassword) {
        //     toast.error("Please fill in all fields.");
        //     return;
        // }
    
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
    
        if (passwordStrength < 3) { 
            toast.error("Password not strong enough.");
            return;
        }
    
        // try {
        //     await axios.post(
        //         // `${renderBackend}/users/register`,
        //         `${localhostBackend}/users/register`,
        //         { name, username, password, address }
        //     );
        //     const loginResponse = await axios.post(
        //         // `${renderBackend}/users/login`,
        //         `${localhostBackend}/users/login`,
        //         { username, password }
        //     );
        //     localStorage.setItem("token", loginResponse.data.token);
        //     navigate("/");
        // } catch (error) {
        //     if (error.response && error.response.status === 400) {
        //         toast.error(
        //         error.response.data.error ||
        //             "Registration failed: Username may already be taken or invalid."
        //         );
        //     } else {
        //         toast.error("Registration failed, please try again");
        //     }
        // }
    };
    // const handlePasswordChange = (e) => {
    //     const newPassword = e.target.value;
    //     setPassword(newPassword);
    //     validatePassword(newPassword, confirmPassword);
    // }
    // const handleConfirmPasswordChange = (e) => {
    //     const newConfirmPassword = e.target.value;
    //     setConfirmedPassword(newConfirmPassword);
    //     validatePassword(password, newConfirmPassword);
    // };
    
    // const validatePassword = (password, confirmPassword) => {
    //     const minLength = password.length >= 6;
    //     const specialChar = /[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|-]/.test(password);
    //     const number = /\d/.test(password);
    //     const capital = /[A-Z]/.test(password);
    //     const match = password === confirmPassword;
    
    //     setIsPasswordValid(minLength && specialChar && number && capital);
    //     setPasswordStrength(calculatePasswordStrength(password));
    // };
    
    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 6) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/\d/.test(password)) strength += 1;
        if (/[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|-]/.test(password)) strength += 1;
        return strength;
    };

    return (
        <div className="reset-password-container">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={true}
            />
            <h1>Reset Password</h1>
            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password-strength-bar">
                <PasswordStrengthBar
                className="bar"
                password={password}
                minLength={6}
                scoreWords={['Too Weak', 'Weak', 'Okay', 'Good', 'Strong']}
                onChangeScore={(score) => setPasswordStrength(score)}
            />
            </div>
            <input
                type="confirm-password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="animated-button">
                Reset
            </button>
        </div>
    );
};

export default ResetPswd;