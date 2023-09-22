import React, { useState, useEffect, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import { CourseContainer, InfoBlurb } from "../styles/courseDetails.styles";
import { useParams } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import { Button } from "react-bootstrap";
import {
  peavineRacePath,
  newHavenRacePath,
} from "../../constants/riverPathways";

const CourseDetails = (props) => {
  const userctx = useContext(UserContext);
  const { raceName } = useParams();
  const [raceInfo, setRaceInfo] = useState({});
  const [position1, setPosition1] = useState([]);
  const [position2, setPosition2] = useState([]);

  useEffect(() => {
    try {
      if (userctx.raceFeedItems.length > 0) {
        let raceInformation = userctx.raceFeedItems.find((race) => {
          return (
            race.name.toLowerCase() ==
            raceName.replaceAll("-", " ").toLowerCase()
          );
        });
        if (typeof raceInformation.gauges === "string") {
          raceInformation.gauges = JSON.parse(raceInformation.gauges);
        }
        if (typeof raceInformation.description === "string") {
          raceInformation.description = raceInformation.description
            .split(/\n+/)
            .filter(function (paragraph) {
              return paragraph.trim() !== "";
            });
        }
        console.log(raceInformation);
        setRaceInfo(raceInformation);
        setPosition1([raceInformation.putIn.x, raceInformation.putIn.y]);
        setPosition2([raceInformation.takeOut.x, raceInformation.takeOut.y]);
      }
    } catch (e) {
      console.error(e.message);
    }
  }, [userctx.raceFeedItems]);
  return (
    <>
      <CourseContainer>
        <h1>{raceInfo.name}</h1>
        <h3>Description</h3>
        {raceInfo?.description?.map((paragraph, index) => {
          return <p key={index}>{paragraph}</p>
        })}
        {position1.length > 0 && (
          <MapContainer center={position1} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polyline
              positions={
                raceInfo?.name == "Peavine Race"
                  ? peavineRacePath
                  : newHavenRacePath
              }
            />
            <Marker position={position1}>
              <Popup>
                <h4>Put-In</h4>
              </Popup>
            </Marker>
            <Marker position={position2}>
            <Popup>
                <h4>Take-Out</h4>
              </Popup>
            </Marker>
          </MapContainer>
        )}

        <h3>Directions</h3>
        <p>{raceInfo.directions}</p>
        <h3>Flows</h3>
        {raceInfo?.gauges?.length > 0 && (
          <ul>
            <li>LOW: {raceInfo?.gauges[0]}</li>
            <li>MED: {raceInfo?.gauges[1]}</li>
            <li>HIGH: {raceInfo?.gauges[2]}</li>
          </ul>
        )}

        <Button>Main Races Page</Button>
      </CourseContainer>
    </>
  );
};

export default CourseDetails;