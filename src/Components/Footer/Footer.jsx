import React from 'react';
import './Footer.css';
import linkedinIcon from "/assets/icons8-linkedin-50.png";
import gmailIcon from "/assets/icons8-gmail-50.png";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left">
                <div className="branding">
                    <img src="/assets/poll-pal-icon.png" alt="Poll Pal Icon" className="poll-pal-icon" />
                    <p className="description">PollPal</p>
                </div>
                <p className="copyright">© 2024 Future Force Tech Launchpad</p>
            </div>
            <div className="footer-right">
                <div className="students">
                    <div className="student">
                        <p className="student-name">Lucky Beulla Muhoza</p>
                        <a href="https://www.linkedin.com/in/luckymuhoza/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                            <img src={linkedinIcon} alt="LinkedIn" className="linkedin-icon" />
                        </a>
                        <a href="mailto:muhozaluckyb03@gmail.com" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                            <img src={gmailIcon} alt="Gmail" className="linkedin-icon" />
                        </a>
                    </div>
                    <div className="student">
                        <p className="student-name">Samuel Rubuelta-Sanchez</p>
                        <a href="https://www.linkedin.com/in/luckymuhoza/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                            <img src={linkedinIcon} alt="LinkedIn" className="linkedin-icon" />
                        </a>
                    </div>
                    <div className="student">
                        <p className="student-name">Hanna Abrahem</p>
                        <a href="https://www.linkedin.com/in/luckymuhoza/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                            <img src={linkedinIcon} alt="LinkedIn" className="linkedin-icon" />
                        </a>
                    </div>
                    <div className="student">
                        <p className="student-name">Kiahna Isadore</p>
                        <a href="https://www.linkedin.com/in/luckymuhoza/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                            <img src={linkedinIcon} alt="LinkedIn" className="linkedin-icon" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
