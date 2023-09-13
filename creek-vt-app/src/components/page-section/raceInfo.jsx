import { useContext } from "react";
import { Button } from "reactstrap";
import { UserContext } from "../store/UserContext";
import { useNavigate } from "react-router-dom";
const RaceInfo = (props) => {
  const userctx = useContext(UserContext);
  const { name, year, location } = userctx.race;
  const navigate = useNavigate();
  function handleRegisterClick(e) {
    e.preventDefault();
    navigate("/raceRegistration");
  }
  function handleGalleryClick(e){
    e.preventDefault()
    navigate("/photoGallery")
  }
  return (
    <>
      <h2>{name}</h2>
      <h3>{year}</h3>
      <h3>{location}</h3>
      <Button onClick={handleRegisterClick}>Register</Button>
      <div className="d-flex justify-content-center">
        <img
          src="https://creekvt.com/wp-content/uploads/2023/07/All-American-Michael-from-NH-1024x603.jpg"
          style={{ maxHeight: "30vh", width: "auto", borderRadius: "8px" }}
        />
      </div>
      <Button>Course Details</Button>
      <Button onClick={handleGalleryClick}>Gallery</Button>
      <Button>Results</Button>
    </>
  );
};

export default RaceInfo;
