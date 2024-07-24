import React from "react";
import "./NotLoggedPrompt.css";
import { useNavigate, Link } from "react-router-dom";

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
                <h2 className="lptest1">Please Log In or Register</h2>
                {/* <p className="lptest2">You need to be logged in to create and view your posts.</p> */}
                <div className="modal-buttons">
                    <Link to={`/login`}>
                        <button type="button" class="glow-on-hover">Sign In </button>
                    </Link>
                    <Link to={`/register`}>
                        <button type="button" class="glow-on-hover">Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotLoggedPrompt;