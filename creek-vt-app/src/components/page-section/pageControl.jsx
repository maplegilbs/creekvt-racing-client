import Register from "../auth/register";
import Signin from "../auth/signin";
import RacesMain from "./racesMain";
import RaceRegistration from "./raceRegistration";
import RaceResults from "./raceResults";
import RegisteredRacers from "./registeredRacers";
import RaceInfo from "./raceInfo";

const PageControl = (props) => {
  return (
    <>
      {props.showRacesMain === true && <RacesMain />}
      {props.showRegister === true && (
        <Register
          updateToken={props.updateToken}
          setShowRacesMain={props.setShowRacesMain}
          setShowRegister={props.setShowRegister}
        />
      )}
      {/* <Signin updateToken={props.updateToken} setShowRacesMain={props.SetShowRacesMain} setShowSignIn={props.setShowSignIn}/> */}
    </>
  );
};

export default PageControl;
