import React from "react";
import "./AboutSection.css";
import infoIcon from "/assets/icons8-check-64.png";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="text-container">
        <h2 className="about-title">What is PollPal?</h2>
        <h3 className="about-subtitle">Main Features</h3>
      </div>
      <div className="features-container">
        <div className="card">
          <div className="feature-content">
            <h4 className="feature-title">
              <img className="info-icon" src={infoIcon} />
              Elections
            </h4>
            <p className="feature-description">
              View details on ongoing elections and find the nearest polling
              locations based on your inputted location.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="feature-content">
            <h4 className="feature-title">
              <img className="info-icon" src={infoIcon} />
              Representatives
            </h4>
            <p className="feature-description">
              Discover information about your local, state, and national
              representatives. Learn about their roles and responsibilities.
            </p>
          </div>
        </div>
        
        <div className="card">
          <div className="feature-content">
            <h4 className="feature-title">
              <img className="info-icon" src={infoIcon} />
              Interactive Map
            </h4>
            <p className="feature-description">
              Explore an interactive map to view and filter Representatives
              based on their state.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="feature-content">
            <h4 className="feature-title">
              <img className="info-icon" src={infoIcon} />
              Forum
            </h4>
            <p className="feature-description">
              Participate in community discussions and share your opinion on
              various topics.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="feature-content">
            <h4 className="feature-title">
              <img className="info-icon" src={infoIcon} />
              Reminders
            </h4>
            <p className="feature-description">
              Set up reminders for election dates and deadlines.
            </p>
          </div>
        </div>
        <svg className="arrows">
          <path className="a1" d="M0 0 L30 32 L60 0"></path>
          <path className="a2" d="M0 20 L30 52 L60 20"></path>
          <path className="a3" d="M0 40 L30 72 L60 40"></path>
        </svg>
      </div>
    </section>
  );
};

export default AboutSection;
