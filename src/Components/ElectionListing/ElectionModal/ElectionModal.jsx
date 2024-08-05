import React, { useState, useEffect, useRef } from "react";
// import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import "./ElectionModal.css";
import Candidate from "./Candidate/Candidate";
import MapContainer from "./MapContainer/MapContainer";
import { Link } from "react-router-dom";

const LIBRARIES = ["places"];
const apiKey = import.meta.env.VITE_GOOGLE_CIVIC_API_KEY;

const ElectionModal = ({ onClose, electionId, electionName, address }) => {
  const [selectedTab, setSelectedTab] = useState("ballot");
  const [ballotInfo, setBallotInfo] = useState([]);
  const [pollingLocations, setPollingLocations] = useState([]);
  const [earlyVoteSites, setEarlyVoteSites] = useState([]);
  const [dropOffLocations, setDropOffLocations] = useState([]);
  const [regToVote, setRegToVote] = useState(null);
  const [checkReg, setCheckReg] = useState(null);
  const [moreInfo, setMoreInfo] = useState(null);

  //   const { isLoaded, loadError } = useLoadScript({
  //     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  //     libraries: LIBRARIES,
  //   });

  const fetchElectionInfo = async () => {
    const response = await fetch(
      `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${apiKey}&address=${address}&electionId=${electionId}`
    );
    const data = await response.json();
    console.log("Election infooo:", data);

    setBallotInfo(
      data.contests
        ? data.contests.map((contest) => ({
            race: contest.ballotTitle || contest.office,
            party: contest.primaryParties,
            district: contest.district.name,
            candidates: contest.candidates,
            measure: contest.referendumText,
          }))
        : "No ballot information available"
    );

    console.log("ballot INFO: ", ballotInfo);

    //------------------------------------------------------------------------------------------------------
    // FORMATTING POLLING LOCATION COORDS FOR MAP USE
    const pollingLocationCoords = data.pollingLocations
      ? {
          address: data.pollingLocations.map(
            (location) =>
              `${location.address.line1}, ${location.address.city}, ${location.address.state}`
          ),
          name: data.pollingLocations.map(
            (location) => location.address.locationName
          ),
          latitude: data.pollingLocations.map((location) => location.latitude),
          longitude: data.pollingLocations.map(
            (location) => location.longitude
          ),
        }
      : null;
    setPollingLocations(
      pollingLocationCoords
        ? pollingLocationCoords.address.map((_, index) => ({
            address: pollingLocationCoords.address[index],
            name: pollingLocationCoords.name[index],
            latitude: pollingLocationCoords.latitude[index],
            longitude: pollingLocationCoords.longitude[index],
          }))
        : null
    );
    //------------------------------------------------------------------------------------------------------
    // FORMATTING DROP-OFF LOCATION COORDS FOR MAP USE
    const dropOffCoords = data.dropOffLocations
      ? {
          address: data.dropOffLocations.map(
            (location) =>
              `${location.address.line1}, ${location.address.city}, ${location.address.state}`
          ),
          name: data.dropOffLocations.map(
            (location) => location.address.locationName
          ),
          latitude: data.dropOffLocations.map((location) => location.latitude),
          longitude: data.dropOffLocations.map(
            (location) => location.longitude
          ),
        }
      : null;
    setDropOffLocations(
      dropOffCoords
        ? dropOffCoords.address.map((_, index) => ({
            address: dropOffCoords.address[index],
            name: dropOffCoords.name[index],
            latitude: dropOffCoords.latitude[index],
            longitude: dropOffCoords.longitude[index],
          }))
        : null
    );
    //------------------------------------------------------------------------------------------------------
    // FORMATTING EARLY VOTE SITE LOCATION COORDS FOR MAP USE
    const earlyVoteCoords = data.earlyVoteSites
      ? {
          address: data.earlyVoteSites.map(
            (location) =>
              `${location.address.line1}, ${location.address.city}, ${location.address.state}`
          ),
          name: data.earlyVoteSites.map(
            (location) => location.address.locationName
          ),
          latitude: data.earlyVoteSites.map((location) => location.latitude),
          longitude: data.earlyVoteSites.map((location) => location.longitude),
        }
      : null;
    setEarlyVoteSites(
      dropOffCoords
        ? earlyVoteCoords.address.map((_, index) => ({
            address: earlyVoteCoords.address[index],
            name: earlyVoteCoords.name[index],
            latitude: earlyVoteCoords.latitude[index],
            longitude: earlyVoteCoords.longitude[index],
          }))
        : null
    );
    //------------------------------------------------------------------------------------------------------

    console.log("polling location COOOOORDS", pollingLocationCoords);
    console.log("dropoff COOOOORDS", dropOffCoords);
    console.log("polling locations: ", pollingLocations); // RETURNS POLLING LOCATION CORDS
    console.log("drop off locations : ", dropOffLocations); // RETURNS DROP OFF LOCATION COORS
    console.log("early vote sites: ", earlyVoteSites); //RETURNS EARLY VOTING SITES COORDS

    setRegToVote(
      data.state[0].electionAdministrationBody.electionRegistrationUrl
    );
    console.log("reg to vote link: ", regToVote);
    setCheckReg(
      data.state[0].electionAdministrationBody
        .electionRegistrationConfirmationUrl
    );
    console.log("check reg link: ", checkReg);
    setMoreInfo(
      data.state[0].electionAdministrationBody.ballotInfoUrl ||
        data.state[0].electionAdministrationBody.electionInfoUrl
    );
    console.log("more info link: ", moreInfo);
  };

  useEffect(() => {
    try {
      fetchElectionInfo();
    } catch (error) {
      console.error("error fetching voter info or maps: ", error);
    }
  }, []);

  //   useEffect(() => {
  //     if (pollingLocations.length > 0 && !tabs.polling) {
  //       setTabs((prev) => ({
  //         ...prev,
  //         polling: renderMap(pollingLocations),
  //       }));
  //     }
  //     if (earlyVoteSites.length > 0 && !tabs.early) {
  //       setTabs((prev) => ({
  //         ...prev,
  //         early: renderMap(earlyVoteSites),
  //       }));
  //     }
  //     if (dropOffLocations.length > 0 && !tabs.dropoff) {
  //       setTabs((prev) => ({
  //         ...prev,
  //         dropoff: renderMap(dropOffLocations),
  //       }));
  //     }
  //   }, [pollingLocations, earlyVoteSites, dropOffLocations]);

  const renderBallotInfo = (ballotInfo) => {
    if (typeof ballotInfo === "string") {
      return <p className="ballot-info-text">{ballotInfo}</p>;
    } else {
      return (
        <div className="ballot-info">
          <h1 className="measures">Measures</h1>
          {ballotInfo.map((info, index) => (
            <details key={index} className="ballot-item">
              {(info.party && (
                <summary className="race-title">
                  {info.race}, {info.party}
                </summary>
              )) || <summary className="race-title">{info.race}</summary>}
              <div className="ballot-details">
                <h4 className="race-district">{info.district}</h4>
                <ul className="candidates-list">
                  {info.candidates && info.candidates.length > 0 ? (
                    info.candidates.map((candidate, idx) => (
                      <Candidate
                        key={idx}
                        name={candidate.name}
                        party={info.party || candidate.party}
                        position={info.race}
                        district={info.district}
                      />
                    ))
                  ) : info.measure ? (
                    <li className="measure-text">{info.measure}</li>
                  ) : (
                    <li className="no-further-info">
                      No further info available
                    </li>
                  )}
                </ul>
              </div>
            </details>
          ))}
        </div>
      );
    }
  };

  const renderMap = (locations) => {
    return <MapContainer locations={locations} />;
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "ballot":
        return renderBallotInfo(ballotInfo);
      case "polling":
        return renderMap(pollingLocations);
      case "early":
        return renderMap(earlyVoteSites);
      case "dropoff":
        return renderMap(dropOffLocations);
      default:
        return null;
    }
  };

  const handleRedirect = (url) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("No Link Available Currently...");
    }
  };

  return (
    <div>
      <div className={"modal-overlay"} onClick={onClose}>
        <div
          className="election-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="modal-election-name">{electionName}</h3>
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
          <div className="reg-link-buttons">
            <button
              className="animated-button reg-button"
              onClick={() => handleRedirect(moreInfo)}
            >
              More Info
            </button>
            <button
              className="animated-button reg-button"
              onClick={() => handleRedirect(regToVote)}
            >
              Register to Vote
            </button>
            <button
              className="animated-button reg-button"
              onClick={() => handleRedirect(checkReg)}
            >
              Check Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectionModal;
