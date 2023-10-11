//Google maps
import { Wrapper } from "@googlemaps/react-wrapper";
//Hooks
import { useRef, useEffect } from "react";
//Styles
import styles from "./map.module.css"

function MyMapComponent({ center, zoom, mapTypeId }) {
    const ref = useRef();

    useEffect(() => {
        const myMap = new window.google.maps.Map(ref.current, { center, zoom, mapTypeId, streetViewControl: false });
        
        const georssLayer = new window.google.maps.KmlLayer({
            url: "https://creekvt.com/races/new_haven_race_course_2024.kml",
        });
        georssLayer.setMap(myMap);
        const myMarker = new window.google.maps.Marker({
            position: center,
            myMap,
            title: "Hello World!",
          });
          myMarker.setMap(myMap)

    });

    return <div className={`${styles["map"]}` } ref={ref} id="map">Hello~</div>;
}

export default function Map() {
    return (
        <div className={`${styles["map-container"]}`}>
            <Wrapper apiKey={"AIzaSyBBtqHKDrsiMp-7ldVkI6QEMoxjzggJ-J8"}>
                <MyMapComponent center={{ lat: 44.123300, lng: -73.0343349 }} zoom={29} mapTypeId={'terrain'} />
            </Wrapper>
        </div>
    )
}