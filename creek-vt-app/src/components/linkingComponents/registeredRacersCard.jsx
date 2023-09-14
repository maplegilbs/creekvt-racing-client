import { CardText } from "reactstrap";

const RegisteredRacersCards = (props) => {
  const { firstName, lastName } = props.registeredAthlete;
  return (
    <div className="border border-dark ">
      <CardText className="d-flex justify-content-center">
        {lastName}, {firstName}
      </CardText>
    </div>
  );
};

export default RegisteredRacersCards;
