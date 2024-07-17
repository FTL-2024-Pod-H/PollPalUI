import React from "react";
import "./HomePage.css";
import SearchLocation from "../SearchLocation/SearchLocation";
import AboutSection from "./AboutSection/AboutSection";
import ElectionEducation from "./ElectionEducation/ElectionEducation";


function HomePage() {
    
    return (
        <>
            <div className="search-location">
                <h2>Get election info based on your location</h2>
                <SearchLocation/>
                <AboutSection />
                <ElectionEducation />
            </div>
        </>
    );
}

export default HomePage;
