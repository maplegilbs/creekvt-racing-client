import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardBody, CardTitle } from "reactstrap";
import { UserContext } from "../store/UserContext";
import urlBuilder from "../util/urlBuilder";

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
      <div
        style={{
          margin: "8vh",
          border: "solid black 1px",
          padding: "3px",
          maxWidth: "16vh",
        }}>
        <CardBody onClick={handleSubmit}>
          <img
            src="https://freesvg.org/img/1400661325.png"
            alt="defaultKayak"
            style={{ maxWidth: "12vh", maxHeight: "12vh" }}
          />
          <CardTitle
            style={{
              border: "solid black 1px",
              textAlign: "center",
            }}>
            {name}
          </CardTitle>
        </CardBody>
      </div>
    </>
  );
};

export default RaceInfoCards;
