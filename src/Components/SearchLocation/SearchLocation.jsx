import React, {useState, useRef} from "react";
import {LoadScript, Autocomplete } from '@react-google-maps/api';
import "./SearchLocation.css";

const libraries = ["places"];

const SearchLocation = () => {
    const autocompleteRef = useRef(null);
    const [address, setAddress] = useState("");

    const onAutoCompleteLoad = (autocomplete) => {
        autocompleteRef.current = autocomplete
    };

    const onPlaceChanged = () => {
        if (autocompleteRef.current !== null) {
            const place = autocompleteRef.current.getPlace();
            setAddress(place.formatted_address);
            console.log("selected address", place.formatted_address);
        } else {
            console.log("Missing Address")
        }
    };

    return (
        <LoadScript 
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={libraries}
        >
            <div className="search-location-container">
                <Autocomplete
                    onLoad={onAutoCompleteLoad}
                    onPlaceChanged={onPlaceChanged}
                >
                    <input
                        type="text"
                        placeholder="Search a location"
                        id="place-input"
                    />
                </Autocomplete>
            </div>
        </LoadScript>
    );
};

export default SearchLocation;