import React from "react";
import "./NotLoggedPrompt.css";

const NotLoggedPrompt = ({onClose}) => {

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return(
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="not-logged-promt-icon-container">
                    <img src="/assets/poll-pal-icon.png" alt="Poll Pal Icon" className="not-logged-prompt-icon" />
                </div>
                <h2>Please Log In or Register</h2>
                <p>You need to be logged in to create and view your posts.</p>
                <div className="modal-buttons">
                    {/* <button onClick={() => window.location.href = '/login'}>Log In</button>
                    <button onClick={() => window.location.href = '/register'}>Register</button> */}
                    <button class="cssbuttons-io2" onClick={() => window.location.href = '/login'}><span>Sign In</span></button>
                    <button class="cssbuttons-io2" onClick={() => window.location.href = '/register'}><span>Register</span></button>
                </div>
            </div>
        </div>
    );
}

export default NotLoggedPrompt;