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
      <Signin updateToken={props.updateToken} />
    </>
  );
};

export default PageControl;
