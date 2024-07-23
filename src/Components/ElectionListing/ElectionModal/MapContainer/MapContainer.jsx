import React from "react";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
const LIBRARIES = ["places"];

const MapContainer = ({ locations }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });
  console.log(locations);
  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={{ height: "600px", width: "100%" }}
        zoom={11}
        center={{ lat: locations[0].latitude, lng: locations[0].longitude }} // Default center
      >
        {locations.map((location, index) => (
          <MarkerF
            key={index}
            position={{
              lat: parseFloat(location.latitude),
              lng: parseFloat(location.longitude),
            }}
          />
        ))}
      </GoogleMap>
    )
  );
};

export default MapContainer;
