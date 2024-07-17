import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import "./ElectionListing.css";

function ElectionListing({electionData}) {
    if (!electionData || electionData.elections === 0) {
        return <p>No upcoming elections in your area</p>; // Handle case where electionData is null or elections array is missing
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    
    return(
        <>
            <div className="election-listing">
                {electionData.map((election, index) => (
                    <div className="each-election" key={index}>
                        <h3 className="election-name">
                            <Link to={`/election/${index}`} className="election-name-link">
                                {election.name}
                            </Link>
                        </h3>
                        <p className="election-day">Election Day: {formatDate(election.electionDay)}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
export default ElectionListing;