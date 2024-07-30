// HomePage.jsx
import React, { useEffect, useRef } from "react";
import "./HomePage.css";
import SearchLocation from "../SearchLocation/SearchLocation";
import AboutSection from "./AboutSection/AboutSection";
import ElectionEducation from "./ElectionEducation/ElectionEducation";
// import ChatBot from "../ChatBot/ChatBot";

function HomePage() {
    
    // useEffect(() => {
    //     const sections = document.querySelectorAll('.section');

    //     const options = {
    //         threshold: 0.1
    //     };

    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 entry.target.classList.add('visible');
    //             } else {
    //                 entry.target.classList.remove('visible');
    //             }
    //         });
    //     }, options);

    //     sections.forEach(section => {
    //         observer.observe(section);
    //     });

    //     return () => {
    //         sections.forEach(section => {
    //             observer.unobserve(section);
    //         });
    //     };
    // }, []);

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

    // window.addEventListener('scroll', function() {
    //     const downArrows = document.querySelector('.arrows');
    //     const section = document.querySelector('.section');
        
    //     if (downArrows && section) {
    //         const sectionBottom = section.getBoundingClientRect().bottom;
    //         const windowHeight = window.innerHeight;
            
    //         if (sectionBottom <= windowHeight) {
    //             downArrows.classList.add('hidden');
    //         } else {
    //             downArrows.classList.remove('hidden');
    //         }
    //     }
    // });

    

    useEffect(() => {
        const searchLocationSection = document.querySelector(".section");
        searchLocationSection.classList.add("visible");
    }, []);

    return (
        <div className="homepage" id="fade-in-section" ref={searchLocationRef}>
            <section className="section search-location" id="initial-viewport">
                <h2>Get election info based on your location</h2>
                <SearchLocation />
                {/* <div className="scrolldown" style={{ color: "skyblue" }}>
                    <div className="chevrons">
                        <div className="chevrondown"></div>
                        <div className="chevrondown"></div>
                    </div>
                </div> */}
                {/* <div class="down-arrows">
                    <div class="down-arrow"></div>
                    <div class="down-arrow"></div>
                </div> */}
                <svg className="arrows">
                    <path className="a1" d="M0 0 L30 32 L60 0"></path>
                    <path className="a2" d="M0 20 L30 52 L60 20"></path>
                    <path className="a3" d="M0 40 L30 72 L60 40"></path>
                </svg>
            </section>
            {/* <ChatBot/> */}
            <section className="section about-section" id="fade-in-section" ref={aboutSectionRef}>
                <AboutSection/>
                {/* <svg className="arrows">
                    <path className="a1" d="M0 0 L30 32 L60 0"></path>
                    <path className="a2" d="M0 20 L30 52 L60 20"></path>
                    <path className="a3" d="M0 40 L30 72 L60 40"></path>
                </svg> */}
            </section>
            <section className="section election-education" id="fade-in-section" ref={electionEducationRef}>
                <ElectionEducation />
            </section>
        </div>
    );
}

export default HomePage;
