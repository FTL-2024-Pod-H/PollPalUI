import React, { useState } from "react";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
const LIBRARIES = ["places"];

const MapContainer = ({ locations }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (location) => {
    setSelectedMarker(location);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  console.log("locations", locations);
  if (locations && locations.length > 0) {
    return (
      isLoaded && (
        <GoogleMap
          mapContainerStyle={{ height: "600px", width: "100%" }}
          zoom={10}
          center={{ lat: locations[0].latitude, lng: locations[0].longitude }} // Default center
        >
          {locations.map((location, index) => (
            <MarkerF
              key={index}
              position={{
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude),
              }}
              onClick={() => handleMarkerClick(location)}
            />
          ))}

          {selectedMarker && (
            <InfoWindowF
              position={{
                lat: parseFloat(selectedMarker.latitude),
                lng: parseFloat(selectedMarker.longitude),
              }}
              onCloseClick={handleInfoWindowClose}
            >
              <div>
                <h3 className="marker-name">{selectedMarker.name}</h3>
                <h4 className="marker-address">{selectedMarker.address}</h4>
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      )
    );
  } else {
    return <p>No locations available</p>;
  }
};

export default MapContainer;
