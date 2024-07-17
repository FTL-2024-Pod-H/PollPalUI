import React, {useState, useEffect} from "react";
import "./ElectionListing.css";

function ElectionListing({electionData}) {
    if (!electionData || electionData.elections === 0) {
        return <p>No upcoming elections in your area</p>; // Handle case where electionData is null or elections array is missing
      }

    
    return(
        <>
            <div className="election-listing">
            <ul>
                {electionData.map((election, index) => (
                    <div className="each-election" key={index}>
                        <h3 className="election-name">Election Name: {election.name}</h3>
                        <p className="election-day">Election Day: {election.electionDay}</p>
                    </div>
                ))}
            </ul>
                
            </div>
        </>
    )
}
export default ElectionListing;