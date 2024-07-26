import React, { useState, useEffect } from "react";
import "./Candidate.css";

const Candidate = ({ name, party, position, district }) => {
  // const [isFavorited, setIsFavorited] = useState(false);

  // const toggleFavorite = () => {
  //   setIsFavorited((prev) => !prev);
  // };

  return (
    <div className="candidate-card">
      <div className="card-details">
        <h2 className="candidate-name">{name}</h2>
        <h3 className="candidate-party">{party}</h3>
        <h3 className="candidate-position">{position}</h3>
      </div>
      {/* <span
        className={`star ${isFavorited ? "favorited" : ""}`}
        onClick={toggleFavorite}
      >
        {isFavorited ? "★" : "☆"}
      </span> */}
    </div>
  );
};

export default Candidate;
