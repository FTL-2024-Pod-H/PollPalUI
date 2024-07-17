import React from 'react';
import PropTypes from "prop-types";
import './Representatives.css';

const defaultImagePath = '/assets/no-image.jpg';

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
                                    <div className="representatives-image">
                                        {rep.depiction && <img src={rep.depiction.imageUrl || defaultImagePath} alt={`${rep.name}`} />}
                                    </div>
                                    <h3>{rep.name}</h3>
                                    <p>Party: {rep.partyName}</p>
                                    <p>Start Year: {rep.terms.item[0].startYear}</p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>No representatives found for {selectedState}.</p>
                )
            ) : (
                <p className="select-state-message">No state selected on the map.</p>
            )}
        </div>
    );
};

Representatives.propTypes = {
    representatives: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        depiction: PropTypes.shape({
            imageUrl: PropTypes.string,
        }),
        partyName: PropTypes.string.isRequired,
        terms: PropTypes.shape({
            item: PropTypes.arrayOf(PropTypes.shape({
                startYear: PropTypes.string.isRequired,
            })),
        }).isRequired,
    })).isRequired,
    selectedState: PropTypes.string,
};


export default Representatives;
