import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import PropTypes from "prop-types";
import './Map.css';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const Map = ({ onStateClick, selectedState }) => {

    const handleStateClick = (geo) => {
        const stateName= geo.properties.name;
        onStateClick(stateName);
    };

    return (
        <div className="map-container">
            <ComposableMap 
                projectionConfig={{ scale: 900}}
                projection="geoAlbersUsa"
                width={800}
                height={500}
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <g key={geo.rsmKey}>
                                <Geography
                                    geography={geo}
                                    onClick={() => handleStateClick(geo)}
                                    style={{
                                        default: {
                                            fill: "#F2E6FF",
                                            outline: "none",
                                            stroke: "white",
                                            strokeWidth: "1",
                                        },
                                        hover: {
                                            fill: "#A367E7",
                                            outline: "none",
                                        },
                                        pressed: {
                                            fill: "#49296D",
                                            outline: "none",
                                        },
                                    }}
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={geo.properties.name}
                                />
                            </g>
                        ))
                    }
                </Geographies>
            </ComposableMap>
            <ReactTooltip id="my-tooltip" place="top" effect="solid" />
        </div>
    );
};

Map.propTypes = {
    onStateClick: PropTypes.func.isRequired,
    selectedState: PropTypes.string.isRequired,
};

export default Map;
