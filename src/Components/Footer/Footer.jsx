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
            </div>
            <div className="footer-center">
                <div className="students">
                    <div className="student">
                        <p className="student-name">Kiahna Isadore</p>
                        <a href="https://www.linkedin.com/in/luckymuhoza/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                            <img src={linkedinIcon} alt="LinkedIn" className="linkedin-icon" />
                        </a>
                        <a href="" target="_blank" rel="noopener noreferrer" className="gmail-link">
                            <img src={githubIcon} alt="GitHub" className="github-icon" />
                        </a>
                    </div>
                    <div className="student">
                        <p className="student-name">Hanna Abrahem </p>
                        <a href="https://www.linkedin.com/in/samuelrubuelta/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                            <img src={linkedinIcon} alt="LinkedIn" className="linkedin-icon" />
                        </a>
                        <a href="" target="_blank" rel="noopener noreferrer" className="gmail-link">
                            <img src={githubIcon} alt="GitHub" className="github-icon" />
                        </a>
                    </div>
                    <div className="student">
                        <p className="student-name">Lucky Beulla Muhoza</p>
                        <a href="https://www.linkedin.com/in/hannaabrahem/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                            <img src={linkedinIcon} alt="LinkedIn" className="linkedin-icon" />
                        </a>
                        <a href="https://github.com/luckybeulla" target="_blank" rel="noopener noreferrer" className="gmail-link">
                            <img src={githubIcon} alt="GitHub" className="github-icon" />
                        </a>
                    </div>
                    <div className="student">
                        <p className="student-name">Samuel Rubuelta-Sanchez</p>
                        <a href="https://www.linkedin.com/in/kiahnaisadore/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                            <img src={linkedinIcon} alt="LinkedIn" className="linkedin-icon" />
                        </a>
                        <a href="" target="_blank" rel="noopener noreferrer" className="gmail-link">
                            <img src={githubIcon} alt="GitHub" className="github-icon" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-right">
                <p className="copyright">© 2024 Future Force Tech Launchpad</p>
            </div>
        </footer>
    );
};

export default Footer;
