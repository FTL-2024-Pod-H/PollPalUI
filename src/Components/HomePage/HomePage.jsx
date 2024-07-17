import React from "react";
import "./HomePage.css";
import SearchLocation from "../SearchLocation/SearchLocation";


function HomePage() {
    
    return (
        <>
            <div className="search-location">
                <h2>Get election info based on your location</h2>
                <SearchLocation/>
            </div>
        </>
    );
}

export default HomePage;
