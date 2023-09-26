import React from 'react';
import { useParams } from 'react-router-dom';
import { urlBuilder } from "../util/urlBuilder";
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, ChangeView, Marker, Popup, useMap } from 'react-leaflet';
import '../styles/raceMap.styles';
import { API_VIEWALL_RACES } from '../../constants/endpoints';
const RaceMap = (props) => {
  const [putIn, setPutIn] = useState("");
  const [takeOut, setTakeOut] = useState("");
  
  useEffect(() => {
    setPutIn();
  }, []);
  return (<>
    <MapContainer center={putIn} zoom={13} scrollWheelZoom={false} >
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      </MapContainer>

     </>);
}
 
export default RaceMap;