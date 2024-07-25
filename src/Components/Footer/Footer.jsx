import React from 'react';
import './Footer.css';
import linkedinIcon from "/assets/icons8-linkedin-48.png";
import githubIcon from "/assets/github-logo-git-hub-icon-on-white-background-free-vector.jpg";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left">
                <div className="branding">
                    <img src="/assets/poll-pal-icon.png" alt="Poll Pal Icon" className="poll-pal-icon" />
                    <p className="description">Poll<span className="poll-white">Pal</span></p>
                </div>
                <p className="copyright">© 2024 Futureforce Tech Launchpad</p>
            </div>
            {/* <div className="footer-center">
                <p className="copyright">© 2024 Future Force Tech Launchpad</p>
            </div> */}
            <div className="footer-right">
                <div className="students">
                    <div className="student">
                        <p className="student-name">Kiahna Isadore</p>
                        <div className="student-icons">
                            <a href="https://www.linkedin.com/in/kiahna-isadore/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                                <img src={linkedinIcon} alt="LinkedIn" className="linkedin-icon" />
                            </a>
                            <a href="https://github.com/Kisadore" target="_blank" rel="noopener noreferrer" className="github-link">
                                <img src={githubIcon} alt="GitHub" className="github-icon" />
                            </a>
                        </div>
                    </div>
                    <div className="student">
                        <p className="student-name">Hanna Abrahem</p>
                        <div className="student-icons">
                            <a href="https://www.linkedin.com/in/hannaabra/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                                <img src={linkedinIcon} alt="LinkedIn" className="linkedin-icon" />
                            </a>
                            <a href="https://github.com/hanna00112" target="_blank" rel="noopener noreferrer" className="github-link">
                                <img src={githubIcon} alt="GitHub" className="github-icon" />
                            </a>
                        </div>
                    </div>
                    <div className="student">
                        <p className="student-name">Lucky Beulla Muhoza</p>
                        <div className="student-icons">
                            <a href="https://www.linkedin.com/in/luckymuhoza/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                                <img src={linkedinIcon} alt="LinkedIn" className="linkedin-icon" />
                            </a>
                            <a href="https://github.com/luckybeulla" target="_blank" rel="noopener noreferrer" className="github-link">
                                <img src={githubIcon} alt="GitHub" className="github-icon" />
                            </a>
                        </div>
                    </div>
                    <div className="student">
                        <p className="student-name">Samuel Rebuelta-Sanchez</p>
                        <div className="student-icons">
                            <a href="https://www.linkedin.com/in/samuel-rebuelta/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                                <img src={linkedinIcon} alt="LinkedIn" className="linkedin-icon" />
                            </a>
                            <a href="https://github.com/sam-reb" target="_blank" rel="noopener noreferrer" className="github-link">
                                <img src={githubIcon} alt="GitHub" className="github-icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
