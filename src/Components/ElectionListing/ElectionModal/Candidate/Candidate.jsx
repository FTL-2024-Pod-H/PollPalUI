import React from "react";
import "./Candidate.css";

const Candidate = ({ name, party, position, district }) => {
  return (
    <div className="candidate-card">
      <div className="card-details">
        <h2 className="candidate-name">{name}</h2>
        <h3>{party} PARTY</h3>
        <h3>
          {position} for {district}
        </h3>
      </div>
    </div>
  );
};

export default Candidate;
