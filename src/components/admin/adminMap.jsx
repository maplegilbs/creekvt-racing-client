//Contexts
import { SelectedRaceContext } from "../../pages/adminDashboard";
//Google maps
import { Wrapper } from "@googlemaps/react-wrapper";
//Hooks
import { useRef, useEffect, useState, useContext } from "react";
//Styles
import styles from "./adminMap.module.css"

function MyMapComponent({ mapMarkerData }) {
    const selectedRace = useContext(SelectedRaceContext)[0] //Name of race with spaces i.e. "Test Race"
    const [myMap, setMyMap] = useState();
    const [isMapBuilt, setIsMapBuilt] = useState(false);
    const ref = useRef();
    const raceToFetch = selectedRace.split(' ').join('').toLowerCase();

    useEffect(() => {
        const buildMap = async () => {
            let mapOptionsResponse = await fetch(`http://localhost:3000/geoInfo/mapOptions/${raceToFetch}`)
            let mapOptionsData = await mapOptionsResponse.json();
            mapOptionsData = mapOptionsData[0][0];
            const newMap = new window.google.maps.Map(ref.current, {
                center: { lat: Number(mapOptionsData.centerLat), lng: Number(mapOptionsData.centerLng) },
                zoom: Number(mapOptionsData.zoom),
                mapTypeId: mapOptionsData.mapTypeId,
                streetViewControl: false,
                styles: [{
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                }]
            });
            newMap.addListener('click', (e) => console.log(e.latLng.lat(), e.latLng.lng()))
            setMyMap(newMap)
            setIsMapBuilt(true)
        }
        buildMap()

    }, []);



    useEffect(() => {
        mapMarkerData.forEach(markerData => {
            // console.log(markerData, myMap)
            const myMarker = new window.google.maps.Marker({
                position: { lat: Number(markerData.lat), lng: Number(markerData.lng) },
                myMap,
                icon: "https://creekvt.com/races/RacerIcon.png",
                title: "Hello World!",
            });
            myMarker.setMap(myMap)
        })
    }, [isMapBuilt, mapMarkerData])



    return <div className={`${styles["map"]}`} ref={ref} id="map">Hello~</div>;
}

export default function AdminMap({ mapMarkerData }) {

    return (
        <div className={`${styles["map-container"]}`} >
            <Wrapper apiKey={"AIzaSyBBtqHKDrsiMp-7ldVkI6QEMoxjzggJ-J8"}>
                <MyMapComponent mapMarkerData={mapMarkerData} />
            </Wrapper>
        </div>
    )
}