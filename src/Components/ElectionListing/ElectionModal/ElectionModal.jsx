import React, { useState, useEffect, useRef } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import "./ElectionModal.css";

const LIBRARIES = ["places"];
const apiKey = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY;

const ElectionModal = ({ onClose, electionId, electionName, address }) => {
  const [selectedTab, setSelectedTab] = useState("ballot");
  const [pollingLocations, setPollingLocations] = useState([]);
  const [earlyVoteSites, setEarlyVoteSites] = useState([]);
  const [dropOffLocations, setDropOffLocations] = useState([]);
  const [maps, setMaps] = useState({
    polling: null,
    early: null,
    dropoff: null,
  });

  const fetchElectionInfo = async () => {
    const response = await fetch(
      `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${apiKey}&address=${address}&electionId=${electionId}`
    );
    const data = await response.json();
    console.log("Election infooo:", data);
    //------------------------------------------------------------------------------------------------------
    // FORMATTING POLLING LOCATION COORDS FOR MAP USE
    const pollingLocationCoords = {
      latitude: data.pollingLocations.map((location) => location.latitude),
      longitude: data.pollingLocations.map((location) => location.longitude),
    };
    setPollingLocations(
      pollingLocationCoords.latitude.map((lat, index) => ({
        latitude: lat,
        longitude: pollingLocationCoords.longitude[index],
      }))
    );
    //------------------------------------------------------------------------------------------------------
    // FORMATTING DROP-OFF LOCATION COORDS FOR MAP USE
    const dropOffCoords = {
      latitude: data.dropOffLocations.map((location) => location.latitude),
      longitude: data.dropOffLocations.map((location) => location.longitude),
    };
    setDropOffLocations(
      dropOffCoords.latitude.map((lat, index) => ({
        latitude: lat,
        longitude: dropOffCoords.longitude[index],
      }))
    );
    //------------------------------------------------------------------------------------------------------
    // FORMATTING EARLY VOTE SITE LOCATION COORDS FOR MAP USE
    const earlyVoteCoords = {
      latitude: data.earlyVoteSites.map((location) => location.latitude),
      longitude: data.earlyVoteSites.map((location) => location.longitude),
    };
    setEarlyVoteSites(
      earlyVoteCoords.latitude.map((lat, index) => ({
        latitude: lat,
        longitude: earlyVoteCoords.longitude[index],
      }))
    );
    //------------------------------------------------------------------------------------------------------
    console.log("polling locations: ", pollingLocations); // RETURNS POLLING LOCATION CORDS
    console.log("drop off locations : ", dropOffLocations); // RETURNS DROP OFF LOCATION COORS
    console.log("early vote sites: ", earlyVoteSites); //RETURNS EARLY VOTING SITES COORDS
  };

  useEffect(() => {
    try {
      fetchElectionInfo();
    } catch (error) {
      console.error("error fetching voter info: ", error);
    }
  }, []);

  useEffect(() => {
    if (pollingLocations.length > 0 && !maps.polling) {
      setMaps((prev) => ({
        ...prev,
        polling: renderMap(pollingLocations),
      }));
    }
    if (earlyVoteSites.length > 0 && !maps.early) {
      setMaps((prev) => ({
        ...prev,
        early: renderMap(earlyVoteSites),
      }));
    }
    if (dropOffLocations.length > 0 && !maps.dropoff) {
      setMaps((prev) => ({
        ...prev,
        dropoff: renderMap(dropOffLocations),
      }));
    }
  }, [pollingLocations, earlyVoteSites, dropOffLocations]);

  const renderMap = (locations) => (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={LIBRARIES}
    >
      <GoogleMap
        mapContainerStyle={{ height: "600px", width: "100%" }}
        zoom={11}
        center={{ lat: locations[0].latitude, lng: locations[0].longitude }} // Default center, you might want to calculate the center based on locations
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(location.latitude),
              lng: parseFloat(location.longitude),
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case "ballot":
        return <div>Ballot Info Content</div>;
      case "polling":
        return maps.polling;
      case "early":
        return maps.early;
      case "dropoff":
        return maps.dropoff;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className={"modal-overlay"} onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3>{electionName}</h3>
          <div className="tabs">
            <button
              className={selectedTab === "ballot" ? "active" : ""}
              onClick={() => setSelectedTab("ballot")}
            >
              Ballot Information
            </button>
            <button
              className={selectedTab === "polling" ? "active" : ""}
              onClick={() => setSelectedTab("polling")}
            >
              Polling Locations
            </button>
            <button
              className={selectedTab === "early" ? "active" : ""}
              onClick={() => setSelectedTab("early")}
            >
              Early Voting Sites
            </button>
            <button
              className={selectedTab === "dropoff" ? "active" : ""}
              onClick={() => setSelectedTab("dropoff")}
            >
              Drop Off Locations
            </button>
          </div>
          <div className="tab-content">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ElectionModal;
