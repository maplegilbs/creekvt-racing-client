import { useContext } from "react";
import { Button } from "reactstrap";
import { UserContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";
import urlBuilder from "../util/urlBuilder";
import { urlBuilder } from "../util/urlBuilder";
const RaceInfo = (props) => {
  const userctx = useContext(UserContext);
  const { name, year, location, id } = userctx.race;
  const navigate = useNavigate();

  function handleRegisterClick() {
    navigate("/raceRegistration");
  }
  function handleGalleryClick() {
    navigate("/photoGallery");
  }
  function handleRegisteredRacersClick() {
    navigate(`/registeredRacers/${id}`);
  }
  function handleResultsClick(e){
    navigate("/raceResults/" + urlBuilder(name))
  }
  function handleResultsClick(e){
    navigate("/raceResults/" + urlBuilder(name))
  }
  return (
    <>
      <h2>{name}</h2>
      <h3>{year}</h3>
      <h3>{location}</h3>
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
