import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import "./raceInfo.css";
import { useNavigate, useParams } from "react-router-dom";
import { urlBuilder } from "../util/urlBuilder";


const RaceInfo = (props) => {
  const userctx = useContext(UserContext);
  const navigate = useNavigate();
  const { raceName, raceYear, raceLocation, raceid, regOpen } = useParams();
  const unURLName = raceName.replaceAll("-", " ");
  const titleizeName = userctx.titleize(unURLName);
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
      
       <div className="image-cont">
        <img className="img-actual" src="https://creekvt.com/wp-content/uploads/2019/11/WideAngle3000wMiltonFallsSimone.jpg" />
        </div>
        <div className="race-info-container">
        <h2>
          <h2 className="title-txt">{titleizeName}</h2>
          <div>
          <h3 className="location-txt">{raceLocation}, {raceYear}</h3>
          {/* <h3 className="year-txt"></h3> */}
          </div>
        </h2>
        {regOpen == 0 ? null : (
          <button className="regNrace-btns"onClick={handleRegisterClick}>Register to Race</button>
        )}
       
        <button className="regNrace-btns" onClick={handleRegisteredRacersClick}>
          Racers
        </button>

        <h4 className="race-desc-txt">
          The races are super cool and this is a super cool description I cant stand lorem ipsum at all so this is my placeholder!
        </h4>
        </div>

        <div className="btn-xtra-cont">
          <button className="btn-xtras" onClick={handleCourseClick}>Course Details</button>
          <button className="btn-xtras" onClick={handleGalleryClick}>Gallery</button>
          <button className="btn-xtras" onClick={handleResultsClick}>Results</button>
          <button className="btn-xtras" onClick={handleContactClick}>Contact</button>
        </div>
      
    </>
  );
};

export default RaceInfo;
