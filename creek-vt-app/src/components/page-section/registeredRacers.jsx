// a view of all racers registered for the race.
const RegisteredRacers = (props) => {
  return (
    <div className="d-flex flex-column justify-content-center">
      <h4>race name</h4>
      <h3>Registered Racers</h3>
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex justify-content-around">
          <h3>year: selected year here</h3>
          <button>Filter</button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default RegisteredRacers;
