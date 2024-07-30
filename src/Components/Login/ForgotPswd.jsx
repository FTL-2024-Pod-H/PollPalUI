import React, { useState } from "react";
import "./ForgotPswd.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


const ForgotPswd = () => {
    const [email, setEmail] = useState("");

    // const handleForgotPassword = async () => {
    //     try {
    //     toast.success("If an account exists for this email, a reset link will be sent.");
    //     } catch (error) {
    //     toast.error("Failed to send reset link. Please try again later.");
    //     }
    // };

    return (
        <div className="forgot-password-container">
            {/* <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} /> */}
            <h1>Forgot Password</h1>
            <p>Enter your email address and we will send you a link to reset your password.</p>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button className="animated-button">
                <a rel="noopener noreferrer" href="/reset" className="send-link">Send Link</a>
            </button>
        </div>
    );
};

export default ForgotPswd;