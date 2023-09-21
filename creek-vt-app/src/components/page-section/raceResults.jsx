import { useState, useContext, useEffect } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { API_VIEW_RESULTS_BY_RACENAME } from "../../constants/endpoints";
import urlBuilder from "../util/urlBuilder";
import { UserContext } from "../store/UserContext";
import { useParams } from "react-router-dom";
import { RaceResultContainer } from "../styles/raceResults.styles";
// race results filtered by race ID
const RaceResults = (props) => {
  const [results, setResults] = useState([]);
  const userctx = useContext(UserContext);
  const { raceName } = useParams();
  async function fetchRaceResults() {
    try {
      let requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        API_VIEW_RESULTS_BY_RACENAME + raceName,
        requestOptions
      );
      const data = await response.json();
      setResults(data?.races);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (raceName) {
      fetchRaceResults();
    }
  }, [raceName]);

  let rows = [];
  let id = 1;
  let columns = [];
  if (raceName === "new-haven-ledges-race") {
    results.map((result) => {
      let row = {
        id: id,
        col1: result.year,
        col2: result.place,
        col3: result.firstName,
        col4: result.lastName,
        col5: result.fastestLap,
        col6: result.lap1,
        col7: result.lap2,
      };
      rows.push(row);
      id += 1;
    });

    columns = [
      { field: "col1", headerName: "Year", width: 150 },
      { field: "col2", headerName: "Place", width: 150 },
      { field: "col3", headerName: "Athlete First Name", width: 150 },
      { field: "col4", headerName: "Athlete Last Name", width: 150 },
      { field: "col5", headerName: "Fastest Lap", width: 150 },
      { field: "col6", headerName: "Lap 1", width: 150 },
      { field: "col7", headerName: "Lap 2", width: 150 },
    ];
  }
  if (raceName === "peavine-race") {
    results.map((result) => {
      let row = {
        id: id,
        col1: result.year,
        col2: result.place,
        col3: result.firstName,
        col4: result.lastName,
        col5: result.fastestLap,
        col6: result.raceCategory,
      };
      rows.push(row);
      id += 1;
    });
    columns = [
      { field: "col1", headerName: "Year", width: 150 },
      { field: "col2", headerName: "Place", width: 150 },
      { field: "col3", headerName: "Athlete First Name", width: 150 },
      { field: "col4", headerName: "Athlete Last Name", width: 150 },
      { field: "col5", headerName: "Time", width: 150 },
      { field: "col6", headerName: "Category", width: 150 },
    ];
  }

  return (
    <>
      <RaceResultContainer>

      <h2 className="main-txt">RACE RESULTS</h2>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid  rows={rows} columns={columns} />
      </div>

      </RaceResultContainer>
    </>
  );
};

export default RaceResults;
