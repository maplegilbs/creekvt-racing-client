import { useState, useContext, useEffect } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { API_VIEW_RESULTS_BY_RACENAME } from "../../constants/endpoints";
import urlBuilder from '../util/urlBuilder';
import { UserContext } from '../store/UserContext';
import { useParams } from 'react-router-dom';

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
        API_VIEW_RESULTS_BY_RACENAME + raceName, requestOptions
      );
      const data = await response.json();
      console.log(data);
      setResults(data?.races);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (raceName) {
    fetchRaceResults()
    }
  }, [raceName]);
  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];
  
  const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];
  return (
    <>
      <h2>RACE RESULTS</h2>
      <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
    </>
  );
}

export default RaceResults;
