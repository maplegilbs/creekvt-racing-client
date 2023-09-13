import { API_VIEWALL_RACES } from "../../constants/endpoints";
import RaceInfoCards from "../linkingComponents/raceInfoCards";
import React, { useState, useEffect } from "react";
// const jwt = require("jsonwebtoken");

// main races page, also landing page for site. will show by default.
const RacesMain = (props) => {
  const [raceFeedItems, setRaceFeedItems] = useState([]);
  useEffect(() => {
    fetchRacesFeed();
  }, []);
  async function fetchRacesFeed() {
    try {
      let requestOptions = {
        method: "GET",
      };
      const response = await fetch(API_VIEWALL_RACES, requestOptions);
      const data = await response.json();
      setRaceFeedItems(data.races);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className="d-flex flex-column align-items-center m-3"
      style={{ zIndex: 1 }}>
      {/* need real image*/}
      <img
        src="https://creekvt.com/wp-content/uploads/2021/09/FrontPageE1600W_85.jpg"
        alt="hero-image"
        style={{ width: "75%", height: "20vh" }}
      />
      <p>
        Little blurb here from wireframe. Is this an about us? maybe what we
        stand for section? need input
      </p>
      <div
        className="d-flex m-8 flex-wrap justify-content-center g-10"
        style={{ maxWidth: "75%" }}>
        {raceFeedItems.map((race, index) => (
          <RaceInfoCards
            fetchRacesFeed={fetchRacesFeed}
            key={index}
            race={race}
            setShowRacesMain={props.setShowRacesMain}
            setShowRaceInfo={props.setShowRaceInfo}
            setRace={props.setRace}
          />
        ))}
      </div>
    </div>
  );
};

export default RacesMain;
