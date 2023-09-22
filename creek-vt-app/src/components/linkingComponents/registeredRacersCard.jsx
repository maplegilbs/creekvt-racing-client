import { CardText } from "reactstrap";
import{ 
  CardContainer,
  RaceTitle, 
  YearFilter,
  CardTextContainer,
  
} from "../styles/registeredRacers.styles";
const RegisteredRacersCards = (props) => {
  const { firstName, lastName } = props.registeredAthlete;
  return (
    <CardTextContainer>
      <CardText>
        {lastName}, {firstName}
      </CardText>
    </CardTextContainer>
  );
};

export default RegisteredRacersCards;
