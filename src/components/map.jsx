//Google maps
import { Wrapper } from "@googlemaps/react-wrapper";
//Hooks
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router";
//Styles
import styles from "./map.module.css"

function MyMapComponent({ mapMarkerData }) {
    const raceToFetch = useParams().raceName;
    const [myMap, setMyMap] = useState();
    const [mapMarkers, setMapMarkers] = useState([])
    const ref = useRef();

    

    useEffect(() => {
        const buildMap = async () => {
            let mapOptionsResponse = await fetch(`http://localhost:3000/geoInfo/mapOptions/${raceToFetch}`)
            let mapOptionsData = await mapOptionsResponse.json();
            mapOptionsData = mapOptionsData[0];
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
            let bounds = new window.google.maps.LatLngBounds()
            mapMarkerData.forEach( markerData => {
                let location = new window.google.maps.LatLng(Number(markerData[0]), Number(markerData[1]))
                bounds.extend(location)
            })
            if(!bounds.isEmpty()) newMap.fitBounds(bounds)
            mapMarkerData.forEach(markerData => {
                const markerIcon = {
                    url: markerData[2] ? markerData[2] : "https://creekvt.com/races/RacerIcon.png",
                    scaledSize: new window.google.maps.Size(25, 25)
                }
                const myMarker = new window.google.maps.Marker({
                    position: { lat: markerData[0], lng: markerData[1] },
                    myMap,
                    icon: markerIcon,
                    title: "Hello World!",
                });
                myMarker.setMap(newMap)
                setMapMarkers(prev => {
                    prev.push(myMarker)
                    return prev
                })
            })
            setMyMap(newMap)
        }
        buildMap()
    }, []);

    


    
    return <div className={`${styles["map"]}`} ref={ref} id="map"></div>;
}

export default function Map({ mapMarkerData}) {

    return (
        <div className={`${styles["map-container"]}`}>
            <Wrapper apiKey={"AIzaSyBBtqHKDrsiMp-7ldVkI6QEMoxjzggJ-J8"}>
                <MyMapComponent
                    mapMarkerData={mapMarkerData}
                />
            </Wrapper>
        </div>
    )
}