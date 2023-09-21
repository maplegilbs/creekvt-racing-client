import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardBody, CardTitle } from "reactstrap";
import { UserContext } from "../store/UserContext";
import urlBuilder from "../util/urlBuilder";
import "./raceInfoCards.css"
const RaceInfoCards = (props) => {
  const userctx = useContext(UserContext);
  const navigate = useNavigate();
  let { name, year, id, location, regOpen } = props.race;
  function handleSubmit(e) {
    e.preventDefault();
    userctx.setRace(props.race);
    navigate(
      `/raceInfo/${year}/${location}/${id}/${urlBuilder(name)}/${regOpen}`
    );
  }
  return (
    <>
      <div className="kayak-container"
        style={{
          background: "linear-gradient(45deg,#e1eaf4, #4d7288)",
        }}>
        <CardBody onClick={handleSubmit} className={"d-flex"}>
          <div className="kayak-sub">
          <img className="kayaker-img"
            src="https://cdn.discordapp.com/attachments/1131315556243476591/1154230860443304036/RacerIcon.png"
            alt="defaultKayak"
            />
          <CardTitle className="card-title">{name}</CardTitle>
          </div>
        </CardBody>
      </div>
    </>
  );
};

export default RaceInfoCards;
