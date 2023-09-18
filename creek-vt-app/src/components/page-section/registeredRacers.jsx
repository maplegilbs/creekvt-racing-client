import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import { API_VIEW_REGISTERED_RACERS } from "../../constants/endpoints";
import RegisteredRacersCards from "../linkingComponents/registeredRacersCard";
import { useParams } from "react-router-dom";

const RegisteredRacers = (props) => {
  const userctx = useContext(UserContext);
  const [registeredRacersItems, setRegisteredRacersItems] = useState([]);
  const { raceid, raceYear, raceName } = useParams();
  const unURLName = raceName.replaceAll("-", " ");
  const titleizeName = userctx.titleize(unURLName);

  async function fetchRegisteredRacers() {
    try {
      let requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        API_VIEW_REGISTERED_RACERS + raceid,
        requestOptions
      );
      const data = await response.json();
      setRegisteredRacersItems(data.registeredRacers);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchRegisteredRacers();
  }, [raceid]);
  return (
    <div className="d-flex justify-content-center align-items-center text-center">
      <div className="d-flex justify-content-center flex-column align-items-center border border-dark w-25">
        <h2>
          {titleizeName}
          <br />
          Registered Racers
        </h2>
        <div className="d-flex justify-content-between border border-dark bg-secondary text-light w-100">
          <h4>year:{raceYear}</h4>
          <button>Filter</button>
        </div>
        <div className="w-100">
          {registeredRacersItems.map((registeredAthlete, index) => (
            <RegisteredRacersCards
              key={index}
              registeredAthlete={registeredAthlete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisteredRacers;
