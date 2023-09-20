import { useContext } from "react";
// import { Button } from "reactstrap";
import { UserContext } from "../store/UserContext";
import {
  Button,
  RaceImage,
  RaceInfoContainer,
  RaceInfoHeader,
  ButtonGrid,
  RaceDescription,
} from "../styles/raceInfo.styles";
import "./raceInfo.css"

import { useNavigate, useParams } from "react-router-dom";
import { urlBuilder } from "../util/urlBuilder";
const RaceInfo = (props) => {
  const userctx = useContext(UserContext);
  const navigate = useNavigate();
  const { raceName, raceYear, raceLocation, raceid } = useParams();
  const unURLName = raceName.replaceAll("-", " ");
  const titleizeName = userctx.titleize(unURLName);

  function handleRegisterClick() {
    navigate("/raceRegistration");
  }
  function handleGalleryClick() {
    navigate("/photoGallery/" + urlBuilder(raceName) + "/all-photos");
  }
  function handleRegisteredRacersClick() {
    navigate(`/registeredRacers/${raceid}/${raceYear}/${urlBuilder(raceName)}`);
  }
  function handleResultsClick(e) {
    navigate("/raceResults/" + urlBuilder(raceName));
  }
  function handleContactClick(e) {
    // navigate("/raceResults/" + urlBuilder(name))
  }
  function handleCourseClick(e) {
    navigate("/courseDetails" + urlBuilder(raceName));
  }
  function handleContactClick(){
    navigate(`/contact-us/${urlBuilder(raceName)}`)
  }
  return (
    <>
      <RaceInfoContainer>
        <RaceInfoHeader>
          <h2 className="title-txt">{titleizeName}</h2>
          <h3 className="location-txt">{raceLocation}</h3>
          <h3 className="year-txt">{raceYear}</h3>
          
        </RaceInfoHeader>
        <RaceImage src="https://creekvt.com/wp-content/uploads/2023/07/All-American-Michael-from-NH-1024x603.jpg" />
        <Button onClick={handleRegisterClick}>Register</Button>
        <Button className="racers-btn" onClick={handleRegisteredRacersClick}>
          Racers
        </Button>
        
        <RaceDescription className="race-desc-txt">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit id, suscipit saepe maiores a consequuntur eum nostrum sit alias nisi rerum, explicabo harum excepturi earum?
        </RaceDescription>

        <ButtonGrid>
          <Button onClick={handleCourseClick}>Course Details</Button>
          <Button onClick={handleGalleryClick}>Gallery</Button>
          <Button onClick={handleResultsClick}>Results</Button>
          <Button onClick={handleContactClick}>Contact</Button>
        </ButtonGrid>
      </RaceInfoContainer>
    </>
  );
};

export default RaceInfo;
