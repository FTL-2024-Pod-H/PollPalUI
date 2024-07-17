import React, {useState, useEffect} from "react";
import ElectionListing from "../ElectionListing/ElectionListing";
import { useLocation, useNavigate } from 'react-router-dom';
import "./ElectionResults.css";

function ElectionResults() {
    const [electionData, setElectionData] = useState(null);
    const [error, setError] = useState(null);
    const [filteredElectionData, setFilteredElectionData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const address = location.state?.address;
    console.log("Inputed address", address);

    useEffect(() => {
        const fetchElectionData = async () => {
            try {
                const apiKey = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY;
                const response = await fetch(`https://www.googleapis.com/civicinfo/v2/elections?key=${apiKey}&address=${encodeURIComponent(address)}`);
                // &address=${encodeURIComponent(address)}
                if (!response.ok) {
                    throw new Error('Failed to fetch elections');
                }
                const data = await response.json();
                console.log("Election Data:", data);
                setElectionData(data);
            } catch (error) {
                console.error('Error fetching election data:', error);
                // setError(error.message || 'Failed to fetch');
            }
        };
        if (address){
            fetchElectionData();
        }
    }, [address]);

    // const parts = address.split(',');
    // const stateZip = parts[parts.length - 2].trim();
    // const stateAbbreviation = stateZip.split(' ')[0].toLowerCase();

    

    useEffect(() => {
        if (electionData && address) {
            console.log("election data:", electionData);
            const parts = address.split(',');
            const stateZip = parts[parts.length - 2].trim();
            const stateAbbreviation = stateZip.split(' ')[0].toLowerCase();
            console.log("State Abbreviation:", stateAbbreviation);

            const filteredData = electionData.elections.filter(election =>
                election.ocdDivisionId.includes(`ocd-division/country:us/state:${stateAbbreviation}`)
            );
            console.log("Filtered Data:", filteredData);
            setFilteredElectionData(filteredData);
        }
    }, [electionData, address]);
    
    return(
        <>
            <div className="election-results">
                <div className="title-section">
                    <h1 className="showing-elections-for">Showing Elections for <span className="address">{address} | </span>  </h1>
                    <button className="change-address-button" onClick={() => navigate('/')}>Change Address</button>
                </div>
            {electionData ? (
                // <ElectionListing electionData={electionData} />
                filteredElectionData.length > 0 ? (
                    <ElectionListing electionData={filteredElectionData} />
                ) : (
                    <p>No elections in your area</p>
                )
            ) : (
                <p>Loading election data...</p>
            )}
            </div>
        </>
    )
}
export default ElectionResults;