import { useContext } from "react";
import { Button } from "reactstrap";
import { UserContext } from "../store/UserContext";

import { useNavigate, useParams } from "react-router-dom";
import { urlBuilder } from "../util/urlBuilder";
const RaceInfo = (props) => {
  const userctx = useContext(UserContext);
  const navigate = useNavigate();
  const { raceName, raceYear, raceLocation, raceid } = useParams();
  const unURLName = raceName.replaceAll("-", " ");
  const titleizeName = userctx.titleize(unURLName);
  console.log(raceid);

  function handleRegisterClick() {
    navigate("/raceRegistration");
  }
  function handleGalleryClick() {
    navigate("/photoGallery/" + urlBuilder(name) + "/all-photos");
  }
  function handleRegisteredRacersClick() {
    navigate(`/registeredRacers/${raceid}/${raceYear}/${urlBuilder(raceName)}`);
  }
  function handleResultsClick(e){
    navigate("/raceResults/" + urlBuilder(name))
  }
  function handleResultsClick(e){
    navigate("/raceResults/" + urlBuilder(name))
  }
  return (
    <>
      <h2>{titleizeName}</h2>
      <h3>{raceYear}</h3>
      <h3>{raceLocation}</h3>
      <Button onClick={handleRegisterClick}>Register</Button>
      <Button onClick={handleRegisteredRacersClick}>Racers</Button>
      <div className="d-flex justify-content-center">
        <img
          src="https://creekvt.com/wp-content/uploads/2023/07/All-American-Michael-from-NH-1024x603.jpg"
          style={{ maxHeight: "30vh", width: "auto", borderRadius: "8px" }}
        />
      </div>
      <Button>Course Details</Button>
      <Button onClick={handleGalleryClick}>Gallery</Button>
      <Button onClick={handleResultsClick}>Results</Button>
    </>
  );
};

export default RaceInfo;
