import React, { useState, useEffect } from "react";
import ElectionListing from "../ElectionListing/ElectionListing";
import { useLocation, useNavigate } from "react-router-dom";
import "./ElectionResults.css";

function ElectionResults() {
  const [electionData, setElectionData] = useState(null);
  const [filteredElectionData, setFilteredElectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentElections, setCurrentElections] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state?.address;
  // console.log("Inputed address", address);

  useEffect(() => {
    const fetchElectionData = async () => {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY;
        const response = await fetch(
          `https://www.googleapis.com/civicinfo/v2/elections?key=${apiKey}&address=${encodeURIComponent(
            address
          )}`
        );
        // &address=${encodeURIComponent(address)}
        if (!response.ok) {
          throw new Error("Failed to fetch elections");
        }
        const data = await response.json();
        // console.log("Election Data:", data);
        setCurrentElections(data.elections);
        // console.log("current elections", currentElections);
        setElectionData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching election data:", error);
        setLoading(false);
      }
    };
    if (address) {
      fetchElectionData();
    }
  }, [address]);

  useEffect(() => {
    if (electionData && address) {
      // console.log("election data:", electionData);
      const parts = address.split(",");
      const stateZip = parts[parts.length - 2].trim();
      const stateAbbreviation = stateZip.split(" ")[0].toLowerCase();
      // console.log("State Abbreviation:", stateAbbreviation);

      const filteredData = electionData.elections.filter((election) =>
        election.ocdDivisionId.includes(
          `ocd-division/country:us/state:${stateAbbreviation}`
        )
      );
      // console.log("Filtered Data:", filteredData);
      setFilteredElectionData(filteredData);
    }
  }, [electionData, address]);

  return (
    <>
      <div className="election-results">
        <div className="title-section">
          <h1 className="showing-elections-for">Showing Elections for </h1>
          <h1 className="address">{address} </h1>
          <button
            className="change-address-button"
            onClick={() => navigate("/")}
          >
            Change Address
          </button>{" "}
          {/* <button className="change-address-button" onClick={() => navigate('/')}>Change Address</button> */}
        </div>
        {loading ? (
          <div className="custom-loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        ) : electionData ? (
          filteredElectionData.length > 0 ? (
            <ElectionListing
              electionData={filteredElectionData}
              uriAddress={encodeURIComponent(address)}
            />
          ) : (
            <div className="no-elections-response">
              <p className="no-elections-text">No elections for this area...</p>
              {/* <details className="current-elections-menu">
                <summary>Current Elections</summary>
                <ul className="current-elections-list">
                  {currentElections.map((election, idx) => (
                    <li key={idx} className="current-election">
                      {election.name}
                    </li>
                  ))}
                </ul>
              </details> */}
              <div className="current-elections-menu">
                <p>Current Elections</p>
                <ul className="current-elections-list">
                  {currentElections.map((election, idx) => (
                    <li key={idx} className="current-election">
                      {election.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        ) : null}
      </div>
    </>
  );
}
export default ElectionResults;
