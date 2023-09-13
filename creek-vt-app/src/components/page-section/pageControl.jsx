import Register from "../auth/register";
import Signin from "../auth/signin";
import RacesMain from "./racesMain";
import RaceRegistration from "./raceRegistration";
import RaceResults from "./raceResults";
import RegisteredRacers from "./registeredRacers";
import RaceInfo from "./raceInfo";
import React, { useState } from 'react';


const PageControl = (props) => {
  const [race, setRace] = useState("New Haven Ledges Race");
  return (
    <div style={{height: "max-content"}}>
    <RaceInfo/>
      {/* {props.showRacesMain === true && <RacesMain />}
      {props.showRegister === true && (
        <Register
          updateToken={props.updateToken}
          setShowRacesMain={props.setShowRacesMain}
          setShowRegister={props.setShowRegister}
        />
      )}
      <Signin updateToken={props.updateToken} setShowRacesMain={props.SetShowRacesMain} setShowSignIn={props.setShowSignIn}/> */}
      </div>

  );
};

export default PageControl;
