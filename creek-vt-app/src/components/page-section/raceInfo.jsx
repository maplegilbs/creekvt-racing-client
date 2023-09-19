import { useContext } from "react";
// import { Button } from "reactstrap";
import { UserContext } from "../store/UserContext";
import {
  Button,
  RaceImage,
  RaceInfoContainer,
  RaceInfoHeader,
  ButtonGrid,
  RaceDescription
} from "../styles/raceInfo.styles";

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
    // navigate("/photoGallery/" + urlBuilder(name) + "/all-photos");
  }
  function handleRegisteredRacersClick() {
    navigate(`/registeredRacers/${raceid}/${raceYear}/${urlBuilder(raceName)}`);
  }
  function handleResultsClick(e) {
    // navigate("/raceResults/" + urlBuilder(name))
  }
  function handleContactClick(e) {
    // navigate("/raceResults/" + urlBuilder(name))
  }
  function handleCourseClick(e) {
    // navigate("/courseDetails" + urlBuilder(name))
  }
  function handleContactClick(){
    navigate(`/contact-us/${urlBuilder(raceName)}`)
  }
  return (
    <>
      <RaceInfoContainer>
        <RaceInfoHeader>
          <h2>{titleizeName}</h2>
          <h3>{raceYear}</h3>
          <h3>{raceLocation}</h3>
        </RaceInfoHeader>
        <RaceImage src="https://creekvt.com/wp-content/uploads/2023/07/All-American-Michael-from-NH-1024x603.jpg" />
          <Button onClick={handleRegisterClick}>Register</Button>
        <Button className="racers-btn" onClick={handleRegisteredRacersClick}>Racers</Button>
        
        <RaceDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad optio debitis ipsam perferendis accusantium quos, impedit omnis illum error molestias id pariatur aperiam sit nisi soluta! Odit libero, nemo eveniet dolor voluptas vero. Fugiat assumenda dolore autem, alias iure in, exercitationem corrupti et doloremque reiciendis possimus eveniet quibusdam nobis quis sit tenetur facere eum magnam unde esse, sed ab eligendi accusantium dolorum. Ullam nesciunt eligendi, a, voluptatum ad qui animi consectetur quibusdam fuga nam impedit perferendis veritatis facilis quo quia recusandae, quis dolorem unde aliquid laborum provident ratione exercitationem. Voluptas vel culpa voluptatem. Animi, fugit incidunt laboriosam nulla beatae explicabo?</RaceDescription>

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
