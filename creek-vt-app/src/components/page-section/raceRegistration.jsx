import { useContext } from "react";
import { UserContext } from "../store/UserContext";

// after clicking the register button takes you here to register for the race and be addded to the registered races list after a successful payment.
const RaceRegistration = (props) => {
  const userctx = useContext(UserContext);
  return (
    <div>
      <h2>
        this is the registration screen not built out but displaying
        {userctx.race.name}.
      </h2>
    </div>
  );
};

export default RaceRegistration;
