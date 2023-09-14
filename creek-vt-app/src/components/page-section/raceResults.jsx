import React, { useState, useContext } from 'react';

import { API_VIEW_RESULTS_BY_RACENAME } from "../../constants/endpoints";
import urlBuilder from "../util/urlBuilder";
import { UserContext } from '../store/UserContext';

// race results filtered by race ID
const RaceResults = (props) => {
  const userctx = useContext(UserContext)
async function fetchRaceResults() {
  const raceName = "New Haven Ledges Race"
  try {
    let requestOptions = {
      method: "GET",
    };
    const response = await fetch(API_VIEW_RESULTS_BY_RACENAME + urlBuilder(userctx.race.name), requestOptions)
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
