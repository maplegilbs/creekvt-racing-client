import { API_VIEW_RESULTS_BY_RACENAME } from "../../constants/endpoints";
import urlBuilder from "../util/urlBuilder"

// race results filtered by race ID
const RaceResults = (props) => {
async function fetchRaceResults() {
  const raceName = "New Haven Ledges Race"
  try {
    let requestOptions = {
      method: "GET",
    };
    const response = await fetch(API_VIEW_RESULTS_BY_RACENAME + urlBuilder(raceName, requestOptions))
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
  return <>
  <h2>RACE RESULTS</h2>
  </>;
};

export default RaceResults;
