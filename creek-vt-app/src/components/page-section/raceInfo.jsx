//from main races page, information about individual race. shown in figma wireframes slide 2
import { Button } from "reactstrap";
const RaceInfo = (props) => {
  const { name, year, location } = props.race;
  return (
    <>
      <h2>{name}</h2>
      <h3>{year}</h3>
      <h3>{location}</h3>
      <Button>Register</Button>
      <div className="d-flex justify-content-center">
        <img
          src="https://creekvt.com/wp-content/uploads/2023/07/All-American-Michael-from-NH-1024x603.jpg"
          style={{ maxHeight: "30vh", width: "auto", borderRadius: "8px" }}
        />
      </div>
      <Button>Course Details</Button>
      <Button>Gallery</Button>
      <Button>Results</Button>
    </>
  );
};

export default RaceInfo;
