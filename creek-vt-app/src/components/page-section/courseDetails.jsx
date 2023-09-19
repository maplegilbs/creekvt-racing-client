import React, { useState } from "react";
import RaceMap from "./raceMap";
import {
  CourseContainer,
  CourseMap,
  InfoBlurb,
} from "../styles/courseDetails.styles";

const CourseDetails = (props) => {
  return (
    <>
      <CourseContainer>
        <InfoBlurb></InfoBlurb>
        <RaceMap />
      </CourseContainer>
    </>
  );
};

export default CourseDetails;
