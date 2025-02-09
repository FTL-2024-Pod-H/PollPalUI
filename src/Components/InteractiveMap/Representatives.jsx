import React from "react";
import PropTypes from "prop-types";
import "./Representatives.css";
import defaultImagePath from "/assets/no-image.jpg";

const Representatives = ({ representatives, selectedState }) => {
  return (
    <div className="representatives-container">
      {selectedState ? (
        representatives.length > 0 ? (
          <>
            <h3>Selected State: {selectedState}</h3>
            <h1>Representatives</h1>
            <div className="representatives-list">
              {representatives.map((rep) => (
                <div key={rep.id} className="representative-card">
                  {/* {rep.depiction && ( */}
                  <img
                    src={rep.depiction?.imageUrl || defaultImagePath}
                    alt={`${rep.name}`}
                    className="representative-img"
                  />
                  {/* )} */}

                  <div className="representative-details">
                    <h3 className="representative-name">{rep.name}</h3>
                    <p className="representative-chamber">
                      {rep.terms.item[rep.terms.item.length - 1].chamber}
                    </p>
                    {rep.district && (
                      <p className="representative-district">
                        District {rep.district}
                      </p>
                    )}
                    <p className="representative-party">{rep.partyName}</p>
                    <p className="representative-start-year">
                      Since {rep.terms.item[0].startYear}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <p className="select-state-message">No state selected on the map.</p>
      )}
    </div>
  );
};

Representatives.propTypes = {
  representatives: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      depiction: PropTypes.shape({
        imageUrl: PropTypes.string,
      }),
      partyName: PropTypes.string.isRequired,
      terms: PropTypes.shape({
        item: PropTypes.arrayOf(
          PropTypes.shape({
            startYear: PropTypes.string.isRequired,
          })
        ),
      }).isRequired,
    })
  ).isRequired,
  selectedState: PropTypes.string,
};

export default Representatives;
