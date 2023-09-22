import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../store/UserContext";
import { API_VIEW_REGISTERED_RACERS } from "../../constants/endpoints";
import RegisteredRacersCards from "../linkingComponents/registeredRacersCard";
import { useParams } from "react-router-dom";
import{ 
  CardContainer,
  RaceTitle, 
  YearFilter,
  
  
} from "../styles/registeredRacers.styles";


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
  if(registeredRacersItems.length == 0 )return
  return (
    <div className="d-flex justify-content-center align-items-center text-center">
      <div className="d-flex justify-content-center flex-column align-items-center">
        <RaceTitle>
          {titleizeName}
          <br />
          Registered Racers
        </RaceTitle>
        <YearFilter>
          <h4>Year: {raceYear}</h4>
          {/* <button>Filter</button> */}
        </YearFilter>
        <CardContainer>
          {registeredRacersItems.map((registeredAthlete, index) => (
            <RegisteredRacersCards
              key={index}
              registeredAthlete={registeredAthlete}
            />
          ))}
        </CardContainer>
      </div>
    </div>
  );
};

export default RegisteredRacers;
