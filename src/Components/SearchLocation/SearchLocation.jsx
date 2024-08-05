// SearchLocation.jsx
import React, { useState, useRef } from "react";
import { Autocomplete } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import useGoogleMaps from './useGoogleMaps';
import { ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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

    const isValidAddress = (place) => {
        const addressComponents = place.address_components;
        let street = false, postalCode = false;

        addressComponents.forEach(component => {
            if (component.types.includes('street_number') || component.types.includes('route')) {
                street = true;
            }
            if (component.types.includes('postal_code')) {
                postalCode = true;
            }
        });

        return street && postalCode;
    };

    const onPlaceChanged = () => {
        if (autocompleteRef.current !== null) {
            const place = autocompleteRef.current.getPlace();
            if (isValidAddress(place)) {
                setAddress(place.formatted_address);
                // console.log("selected address", place.formatted_address);
                navigate('/results', { state: { address: place.formatted_address } });
            } else {
                toast.error("Incomplete Address: Please select an address with street, city and state :)");
            }
        } else {
            // console.log("Missing Address");
        }
    }

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
                        className="input"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Autocomplete>
                <ToastContainer className="toast-container"/>
            </div>
        ) : (
            <div>Loading...</div>
        )
    );
};

export default SearchLocation;
