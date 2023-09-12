import Register from "../auth/register";
import Signin from "../auth/signin";
import RacesMain from "./racesMain";
import RaceRegistration from "./raceRegistration";
import RegisteredRacers from "./registeredRacers";
import RaceInfo from "./raceInfo";
import RaceResults from "./raceResults";

const PageControl = (props) => {
  return (
    // below is the logic for what page is currently showing.
    <>
      {props.showRacesMain === true && <RacesMain />}
      {props.showRegister === true && (
        <Register
          updateToken={props.updateToken}
          setShowRacesMain={props.setShowRacesMain}
          setShowRegister={props.setShowRegister}
        />
      )}
      {props.showSignIn === true && (
        <Signin
          updateToken={props.updateToken}
          setShowRacesMain={props.setShowRacesMain}
          setShowSignIn={props.setShowSignIn}
        />
      )}
      {/* unsure what the following will need, all pages that need to go to another page need the show logic passed to them from here. */}
      {/* race info will need the gallery info, results, register, and course details, may need the read only one too.*/}
      {props.showRaceInfo === true && (
        <RaceInfo
          setShowRacesMain={props.setShowRacesMain}
          setShowRaceResults={props.setShowRaceResults}
          setShowRaceInfo={props.setShowRaceInfo}
          setShowRegisteredRacers={props.setShowRegisteredRacers}
        />
      )}
      {props.showRaceResults === true && (
        <RaceResults
          setShowRaceResults={props.setShowRaceResults}
          setShowRacesMain={props.setShowRacesMain}
        />
      )}
      {props.showRaceRegistration === true && (
        <RaceRegistration
          setShowRaceRegistration={props.setShowRaceRegistration}
        />
      )}
      {props.registeredRacers === true && (
        <RegisteredRacers
          setShowRegisteredRacers={props.setShowRegisteredRacers}
        />
      )}
    </>
  );
};

export default PageControl;
