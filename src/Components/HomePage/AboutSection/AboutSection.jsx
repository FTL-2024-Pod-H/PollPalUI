import React from "react";
import "./AboutSection.css";
import infoIcon from "/assets/info-icon.svg";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="text-container">
        <h2 className="about-title">What is PollPal?</h2>
        <h3 className="about-subtitle">Main Features</h3>
      </div>
      <div className="features-container">
        <div className="card">
          <img className="info-icon" src={infoIcon} />
          <div className="feature-content">
            <h4 className="feature-title">Elections</h4>
            <p className="feature-description">
              View details on ongoing elections and find the nearest polling
              locations based on your inputted location
            </p>
          </div>
        </div>

        <div className="card">
          <img className="info-icon" src={infoIcon} />
          <div className="feature-content">
            <h4 className="feature-title">Representatives</h4>
            <p className="feature-description">
              Discover information about your local, state, and national
              representatives. Learn about their roles and responsibilities.
            </p>
          </div>
        </div>
        <div className="card">
          <img className="info-icon" src={infoIcon} />
          <div className="feature-content">
            <h4 className="feature-title">Interactive Map</h4>
            <p className="feature-description">
              Explore an interactive map to view and filter Representatives
              based on their state
            </p>
          </div>
        </div>
        <div className="card">
          <img className="info-icon" src={infoIcon} />
          <div className="feature-content">
            <h4 className="feature-title">Forum</h4>
            <p className="feature-description">
              Participate in community discussions and share your opinion on
              various topics.
            </p>
          </div>
        </div>
        <div className="card">
          <img className="info-icon" src={infoIcon} />
          <div className="feature-content">
            <h4 className="feature-title">Reminders</h4>
            <p className="feature-description">
              Set up reminders for election dates and deadlines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
