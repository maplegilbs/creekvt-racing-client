import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardBody, CardTitle } from "reactstrap";
import { UserContext } from "../store/UserContext";
import urlBuilder from "../util/urlBuilder";
import { KayakContainer, KayakSub } from "../styles/racesMain.styles";
const RaceInfoCards = (props) => {
  const userctx = useContext(UserContext);
  const navigate = useNavigate();
  let { name, year, id, location, regOpen } = props.race;
  function handleSubmit(e) {
    e.preventDefault();
    userctx.setRace(props.race);
    navigate(
      `/raceInfo/${year}/${urlBuilder(location)}/${id}/${urlBuilder(
        name
      )}/${regOpen}`
    );
  }
  return (
    <>
      <KayakContainer>
        <CardBody onClick={handleSubmit} className={"d-flex"}>
          <KayakSub>
            <img
              className="kayaker-img"
              src="https://cdn.discordapp.com/attachments/1131315556243476591/1154230860443304036/RacerIcon.png"
              alt="defaultKayak"
            />
            <CardTitle className="card-title">{name}</CardTitle>
          </KayakSub>
        </CardBody>
      </KayakContainer>
    </>
  );
};

export default RaceInfoCards;
