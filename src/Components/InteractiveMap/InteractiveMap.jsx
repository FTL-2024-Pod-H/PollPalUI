// InteractiveMap.jsx
import React, { useState, useRef } from 'react';
import Map from './Map';
import Representatives from './Representatives';
import './InteractiveMap.css';

const InteractiveMap = () => {
    const [representatives, setRepresentatives] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const apiKey = import.meta.env.VITE_CONGRESS_API_KEY;
    const representativesRef = useRef(null);

  const stateNameToCode = {
    Alabama: "AL",
    Alaska: "AK",
    Arizona: "AZ",
    Arkansas: "AR",
    California: "CA",
    Colorado: "CO",
    Connecticut: "CT",
    Delaware: "DE",
    Florida: "FL",
    Georgia: "GA",
    Hawaii: "HI",
    Idaho: "ID",
    Illinois: "IL",
    Indiana: "IN",
    Iowa: "IA",
    Kansas: "KS",
    Kentucky: "KY",
    Louisiana: "LA",
    Maine: "ME",
    Maryland: "MD",
    Massachusetts: "MA",
    Michigan: "MI",
    Minnesota: "MN",
    Mississippi: "MS",
    Missouri: "MO",
    Montana: "MT",
    Nebraska: "NE",
    Nevada: "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    Ohio: "OH",
    Oklahoma: "OK",
    Oregon: "OR",
    Pennsylvania: "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    Tennessee: "TN",
    Texas: "TX",
    Utah: "UT",
    Vermont: "VT",
    Virginia: "VA",
    Washington: "WA",
    "West Virginia": "WV",
    Wisconsin: "WI",
    Wyoming: "WY",
  };
  const fetchRepresentatives = async (stateCode) => {
    try {
      const response = await fetch(
        `https://api.congress.gov/v3/member/${stateCode}?api_key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      const currentReps = [];
      data.members.forEach((member) => {
        if (!member.terms.item[member.terms.item.length - 1].endYear) {
          currentReps.push(member);
        }
      });
      setRepresentatives(currentReps);
      representativesRef.current.scrollIntoView({ behavior: 'smooth' });
      console.log("reps: ", representatives);
    } catch (error) {
      console.error("Error fetching representatives:", error);
    }
  };

  const handleStateClick = (stateName) => {
    const stateCode = stateNameToCode[stateName];
    if (stateCode) {
      setSelectedState(stateName);
      fetchRepresentatives(stateCode);
    } else {
      console.error("Invalid state name:", stateName);
    }
  };

    return (
        <div className="interactive-map-container">
            <h1>Interactive Map</h1>
            <p>Click on state to view current representatives</p>
            <Map onStateClick={handleStateClick} selectedState={selectedState} />
            <div ref={representativesRef}>
                <Representatives representatives={representatives} selectedState={selectedState}/>
            </div>
        </div>
    );
};

export default InteractiveMap;
