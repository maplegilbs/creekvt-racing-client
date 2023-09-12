import { CardBody, CardTitle } from "reactstrap";
import RaceInfo from "../page-section/raceInfo";

const RaceInfoCards = (props) => {
  let {
    affiliatedOrganization,
    date,
    difficulty,
    fallBackDate,
    format,
    gauges,
    id,
    location,
    name,
    numberOfLaps,
    organizerContaact,
    putIn,
    takeOut,
    year,
    startTime,
  } = props.race;
  function handleSubmit(e) {
    e.preventDefault();
    props.setShowRacesMain(false);
    props.setShowRaceInfo(true);
    props.setRace(props.race);
  }
  return (
    <>
      <CardBody
        onClick={handleSubmit}
        style={{
          margin: "8vh",
          border: "solid black 1px",
          padding: "3px",
          maxWidth: "16vh",
        }}>
        <img
          src="https://freesvg.org/img/1400661325.png"
          alt="defaultKayak"
          style={{ maxWidth: "12vh", maxHeight: "12vh" }}
        />
        <CardTitle style={{ border: "solid black 1px" }}>{name}</CardTitle>
      </CardBody>
    </>
  );
};

export default RaceInfoCards;
