// import React, { useEffect } from "react";
// import "./HomePage.css";
// import SearchLocation from "../SearchLocation/SearchLocation";
// import AboutSection from "./AboutSection/AboutSection";
// import ElectionEducation from "./ElectionEducation/ElectionEducation";
// import AOS from "aos";
// import "aos/dist/aos.css";


// function HomePage() {
//     useEffect(() => {
//         AOS.init({
//             duration: 1000,
//             offset: 200,
//             delay: 100,
//             once: true,
//         });
//     }, []);
//     return (
//         <div className="homepage">
//             <div className="search-location" data-aos="fade-up">
//                 <h2>Get election info based on your location</h2>
//                 <SearchLocation/>
//             </div>
//             <AboutSection data-aos="fade-up"/>
//             <ElectionEducation data-aos="fade-up" />
//         </div>
//     );
// }

// export default HomePage;

import React, { useEffect, useRef } from "react";
import "./HomePage.css";
import SearchLocation from "../SearchLocation/SearchLocation";
import AboutSection from "./AboutSection/AboutSection";
import ElectionEducation from "./ElectionEducation/ElectionEducation";

function HomePage() {
    const searchLocationRef = useRef(null);
    const aboutSectionRef = useRef(null);
    const electionEducationRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };

        const handleIntersection = (entries, observer) => {
            entries.forEach(entry => {
                console.log('Entry:', entry);  // Add this line
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, options);

        const sections = [searchLocationRef.current, aboutSectionRef.current, electionEducationRef.current];
        sections.forEach(section => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            sections.forEach(section => {
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, []);

    return (
        <div className="homepage">
            <div className="search-location fade-in-section" ref={searchLocationRef}>
                <h2 className="get-election-info-title">Get election info based on your location</h2>
                <SearchLocation />
            </div>
            <div className="fade-in-section" ref={aboutSectionRef}>
                <AboutSection />
            </div>
            <div className="fade-in-section" ref={electionEducationRef}>
                <ElectionEducation />
            </div>
            {/* White space under ElectionEducation */}
            <div className="white-space" style={{ height: "100px" }} />
        </div>
    );
}

export default HomePage;
