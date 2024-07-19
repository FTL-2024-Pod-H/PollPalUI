import React, { useEffect } from "react";
import "./HomePage.css";
import SearchLocation from "../SearchLocation/SearchLocation";
import AboutSection from "./AboutSection/AboutSection";
import ElectionEducation from "./ElectionEducation/ElectionEducation";

function HomePage() {
    
    useEffect(() => {
        const sections = document.querySelectorAll('.section');

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
            <section className="section search-location" id="initial-viewport">
                <h2>Get election info based on your location</h2>
                <SearchLocation />
            </section>
            <section className="section about-section">
                <AboutSection/>
            </section>
            <section className="section election-education">
                <ElectionEducation />
            </section>
        </div>
    );
}

export default HomePage;
