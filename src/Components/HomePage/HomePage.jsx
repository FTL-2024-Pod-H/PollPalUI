import React, { useEffect } from "react";
import "./HomePage.css";
import SearchLocation from "../SearchLocation/SearchLocation";
import AboutSection from "./AboutSection/AboutSection";
import ElectionEducation from "./ElectionEducation/ElectionEducation";

function HomePage() {
    
    useEffect(() => {
        const handleScroll = () => {
            const homepage = document.querySelector(".homepage");
            const aboutSection = document.querySelector(".about-section");
            const aboutSectionRect = aboutSection.getBoundingClientRect();

            if (aboutSectionRect.top < window.innerHeight && aboutSectionRect.bottom >= 0) {
                homepage.classList.add("scrolled");
            } else {
                homepage.classList.remove("scrolled");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="homepage">
            <div className="search-location" id="initial-viewport">
                <h2>Get election info based on your location</h2>
                <SearchLocation />
            </div>
            {/* <div className="about-section"> */}
                <AboutSection/>
            {/* </div> */}
            {/* <div className="election-education"> */}
                <ElectionEducation />
            {/* </div> */}
        </div>
    );
}

export default HomePage;
