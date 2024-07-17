import React, { useState, useRef } from "react";
import { Autocomplete } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import useGoogleMaps from './useGoogleMaps';
import "./SearchLocation.css";

const libraries = ["places"];
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const SearchLocation = () => {
    const autocompleteRef = useRef(null);
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const loaded = useGoogleMaps(apiKey, libraries);

    const onAutoCompleteLoad = (autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const onPlaceChanged = () => {
        if (autocompleteRef.current !== null) {
            const place = autocompleteRef.current.getPlace();
            setAddress(place.formatted_address);
            console.log("selected address", place.formatted_address);
            navigate('/results', { state: { address: place.formatted_address } });
        } else {
            console.log("Missing Address");
        }
    };

    return (
        loaded ? (
            <div className="search-location-container">
                <Autocomplete
                    onLoad={onAutoCompleteLoad}
                    onPlaceChanged={onPlaceChanged}
                >
                    <input
                        type="text"
                        placeholder="Search a location"
                        id="place-input"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Autocomplete>
            </div>
        ) : (
            <div>Loading...</div>
        )
    );
};

export default SearchLocation;
