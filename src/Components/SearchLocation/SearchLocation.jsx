import React, {useState, useRef} from "react";
import {LoadScript, Autocomplete } from '@react-google-maps/api';
import ElectionResults from "../ElectionResults/ElectionResults";
import { useNavigate } from 'react-router-dom';
import "./SearchLocation.css";

const libraries = ["places"];

const SearchLocation = () => {
    const autocompleteRef = useRef(null);
    const [address, setAddress] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const onAutoCompleteLoad = (autocomplete) => {
        autocompleteRef.current = autocomplete
    };

    const onPlaceChanged = () => {
        if (autocompleteRef.current !== null) {
            const place = autocompleteRef.current.getPlace();
            setAddress(place.formatted_address);
            console.log("selected address", place.formatted_address);
            navigate('/results', { state: { address: place.formatted_address } });
        } else {
            console.log("Missing Address")
        }
    };

    const handleEditAddress = () => {
        setIsEditing(true);
    };

    return (
        // <LoadScript 
        //     googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        //     libraries={libraries}
        // >
        //     <div className="search-location-container">
        //         {isEditing ? (
        //         <Autocomplete
        //             onLoad={onAutoCompleteLoad}
        //             onPlaceChanged={onPlaceChanged}
        //         >
        //             <input
        //                 type="text"
        //                 placeholder="Search a location"
        //                 id="place-input"
        //             />
        //         </Autocomplete>
        //         ) : (
        //             <ElectionResults address={address} onEditAddress={handleEditAddress} />
        //         )}
        //     </div>
        //     {/* <ElectionResults address={address}/> */}
        // </LoadScript>
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