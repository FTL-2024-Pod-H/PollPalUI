import React, { useEffect, useRef } from "react";
import "./HomePage.css";
import SearchLocation from "../SearchLocation/SearchLocation";
import AboutSection from "./AboutSection/AboutSection";
import ElectionEducation from "./ElectionEducation/ElectionEducation";

function HomePage() {

    useEffect(() => {
        const sections = document.querySelectorAll('.fade-in-section');

        const options = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, options);

        sections.forEach(section => {
            observer.observe(section);
        });

        return () => {
            sections.forEach(section => {
                observer.unobserve(section);
            });
        };
    }, []);

    return (
        <div className="homepage">
            <div className="search-location fade-in-section" >
                <h2 className="get-election-info-title">Get election info based on your location</h2>
                <SearchLocation />
            </div>
            <div className="about-section fade-in-section" >
                <AboutSection />
            </div>
            <div className="election-education fade-in-section" >
                <ElectionEducation />
            </div>
        </div>
    );
}

export default HomePage;
