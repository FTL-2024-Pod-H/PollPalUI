import React from "react";
import "./NotLoggedPrompt.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const NotLoggedPrompt = ({onClose}) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const handleLoginClick = () => {
        navigate("/login", { state: { from: location.pathname } });
    };

    const handleRegisterClick = () => {
        navigate("/register", { state: { from: location.pathname } });
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return(
        <div className="nl-modal-overlay" onClick={handleOverlayClick}>
            <div className="nl-modal-content">
            <button className="close-reply-modal-button"onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className="not-logged-promt-icon-container">
                    <img src="/assets/poll-pal-icon.png" alt="Poll Pal Icon" className="not-logged-prompt-icon" />
                </div>
                <h2 className="lptest1">Please Sign in or Register</h2>
                {/* <p className="lptest2">You need to be logged in to create and view your posts.</p> */}
                <div className="nl-modal-buttons">
                    {/* <Link to={`/login`}>
                        <button type="button" className="glow-on-hover">Sign in </button>
                    </Link> */}
                    <button
                    className="glow-on-hover"
                    onClick={handleLoginClick}
                  >
                    Sign in
                  </button>
                    {/* <Link to={`/register`}>
                        <button type="button" className="glow-on-hover">Register</button>
                    </Link> */}
                    <button
                    className="glow-on-hover"
                    onClick={handleRegisterClick}
                  >
                    Register
                  </button>
                </div>
            </div>
        </div>
    );
}

export default NotLoggedPrompt;