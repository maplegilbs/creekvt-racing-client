import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import { API_VIEW_REGISTERED_RACERS } from "../../constants/endpoints";
import RegisteredRacersCards from "../linkingComponents/registeredRacersCard";

const RegisteredRacers = (props) => {
  const userctx = useContext(UserContext);
  const [registeredRacersItems, setRegisteredRacersItems] = useState([]);

  // need endpoint to
  async function fetchRegisteredRacers() {
    let raceid = userctx.race.id;
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
  }, []);
  return (
    <div className="d-flex justify-content-center align-items-center text-center">
      <div className="d-flex justify-content-center flex-column align-items-center border border-dark w-25">
        <h2>
          {userctx.race.name}
          <br />
          Registered Racers
        </h2>
        <div className="d-flex justify-content-between border border-dark bg-secondary text-light w-100">
          <h4>year:{userctx.race.year}</h4>
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
