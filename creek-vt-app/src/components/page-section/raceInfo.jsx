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
  RegRacerContainer,
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

  console.log(props.race);

  function handleRegisterClick() {
    navigate(`/raceRegistration/${raceid}`);
  }
  function handleGalleryClick() {
    navigate("/photoGallery/" + raceName + "/all-photos");
  }
  function handleRegisteredRacersClick() {
    navigate(`/registeredRacers/${raceid}/${raceYear}/${raceName}`);
  }
  function handleResultsClick(e) {
    navigate("/raceResults/" + raceName);
  }
  function handleCourseClick(e) {
    navigate("/courseDetails/" + raceName);
  }
  function handleContactClick() {
    navigate(`/contact-us/${raceName}`);
  }
  return (
    <>
      <RaceInfoContainer className="race-info-container">
        <ImageContainer className="image-cont">
          <RaceImage
            className="img-actual"
            src="https://creekvt.com/wp-content/uploads/2019/11/WideAngle3000wMiltonFallsSimone.jpg"
          />
        </ImageContainer>
        <RaceInfoHeader className="race-info-header">
          <h2>
            <h2 className="title-txt">{titleizeName}</h2>
            <h3 className="location-txt">
              {titleizeLocation}, {raceYear}
            </h3>
            {/* <h3 className="year-txt"></h3> */}
          </h2>
        </RaceInfoHeader>

        <RegRacerContainer>
          {regOpen == 0 ? null : (
            <Button className="reg-btn" onClick={handleRegisterClick}>
              Register to Race
            </Button>
          )}
          <Button className="racers-btn" onClick={handleRegisteredRacersClick}>
            Racers
          </Button>
        </RegRacerContainer>

        <RaceDescription className="race-desc-txt">
          Here you can view all additional information and images before registration. Take a look around!
        </RaceDescription>

        <ButtonGrid className="btn-xtra-cont">
          <Button className="btn-xtras" onClick={handleCourseClick}>
            Course Details
          </Button>
          <Button className="btn-xtras" onClick={handleGalleryClick}>
            Gallery
          </Button>
          <Button className="btn-xtras" onClick={handleResultsClick}>
            Results
          </Button>
          <Button className="btn-xtras" onClick={handleContactClick}>
            Contact
          </Button>
        </ButtonGrid>
      </RaceInfoContainer>
    </>
  );
};

export default RaceInfo;
