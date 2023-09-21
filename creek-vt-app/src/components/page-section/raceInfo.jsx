import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import {
  Button,
  ImageContainer,
  RaceImage,
  RaceInfoContainer,
  RaceInfoHeader,
  ButtonGrid,
  RaceDescription,
  RegRacerContainer
} from "../styles/raceInfo.styles";
// import "../styles/raceInfo.css";

import { useNavigate, useParams } from "react-router-dom";
import { urlBuilder } from "../util/urlBuilder";



const RaceInfo = (props) => {
  const userctx = useContext(UserContext);
  const navigate = useNavigate();
  const { raceName, raceYear, raceLocation, raceid, regOpen } = useParams();
  const unURLName = raceName.replaceAll("-", " ");
  const unURLlocation = raceLocation.replaceAll("-", " ");
  const titleizeName = userctx.titleize(unURLName);
  const titleizeLocation = userctx.titleize(unURLlocation);
  
  console.log(props.race)


  function handleRegisterClick() {
    navigate(`/raceRegistration/${raceid}`);
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
  function handleContactClick() {
    navigate(`/contact-us/${urlBuilder(raceName)}`);
  }
  return (
    <>
      <RaceInfoContainer
        className="race-info-container">
        <ImageContainer className="image-cont">
          <RaceImage className="img-actual" src="https://creekvt.com/wp-content/uploads/2019/11/WideAngle3000wMiltonFallsSimone.jpg" />
      </ImageContainer>
        <RaceInfoHeader className="race-info-header">
        <h2>
          <h2 className="title-txt">{titleizeName}</h2>
          <h3 className="location-txt">{titleizeLocation}, {raceYear}</h3>
          {/* <h3 className="year-txt"></h3> */}
          </h2>
          </RaceInfoHeader>
      
      
        <RegRacerContainer>
        {regOpen == 0 ? null : (
          <Button className="reg-btn"onClick={handleRegisterClick}>Register to Race</Button>
        )}
        <Button className="racers-btn" onClick={handleRegisteredRacersClick}>
          Racers
        </Button>
        </RegRacerContainer>

        <RaceDescription className="race-desc-txt">
          The races are super cool and this is a super cool description I cant stand lorem ipsum at all so this is my placeholder!
        </RaceDescription>

        <ButtonGrid className="btn-xtra-cont">
          <Button className="btn-xtras" onClick={handleCourseClick}>Course Details</Button>
          <Button className="btn-xtras" onClick={handleGalleryClick}>Gallery</Button>
          <Button className="btn-xtras" onClick={handleResultsClick}>Results</Button>
          <Button className="btn-xtras" onClick={handleContactClick}>Contact</Button>
        </ButtonGrid>
        </RaceInfoContainer>

      
    </>
  );
};

export default RaceInfo;
