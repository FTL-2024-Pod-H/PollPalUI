import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ElectionListing.css";
import ElectionModal from "./ElectionModal/ElectionModal";

function ElectionListing({ electionData, uriAddress }) {
  const [showModal, setShowModal] = useState(false);

  if (!electionData || electionData.elections === 0) {
    return <p>No upcoming elections in your area</p>;
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="election-listing">
      {electionData.map((election, index) => (
        <>
          <div className="each-election" key={index}>
            <h3
              className="election-name election-name-link"
              onClick={() => {
                setShowModal(true);
              }}
            >
              {election.name}
            </h3>
            <p className="election-day">
              Election Day: {formatDate(election.electionDay)}
            </p>
          </div>
          {showModal && (
            <ElectionModal
              onClose={() => {
                setShowModal(false);
              }}
              electionId={election.id}
              electionName={election.name}
              address={uriAddress}
            />
          )}
        </>
      ))}
    </div>
  );
}
export default ElectionListing;
