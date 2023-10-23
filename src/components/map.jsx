//Google maps
import { Wrapper } from "@googlemaps/react-wrapper";
//Hooks
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router";
//Styles
import styles from "./map.module.css"

function MyMapComponent({mapMarkerData }) {
    const raceToFetch = useParams().raceName;
    const [myMap, setMyMap] = useState();
    const [mapMarkers, setMapMarkers] = useState([])
    const ref = useRef();


    useEffect(() => {
        const buildMap = async () => {
            let mapOptionsResponse = await fetch(`http://localhost:3000/geoInfo/mapOptions/${raceToFetch}`)
            let mapOptionsData = await mapOptionsResponse.json();
            console.log(mapOptionsData)
            mapOptionsData = mapOptionsData[0][0];
            const newMap = new window.google.maps.Map(ref.current, {
                center: {lat: Number(mapOptionsData.centerLat), lng: Number(mapOptionsData.centerLng)},
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
        }
        buildMap()
    }, []);


    useEffect(() => {
        console.log(mapMarkerData.length, mapMarkers.length)
        //if there is no mapMarkerData there should be no mapMrkers
        if (mapMarkerData.length === 0) {
            mapMarkers.forEach(marker => marker.setMap())
            setMapMarkers([]);
        }
        //more markerData than markers means we need to add a marker to the map i.e. if a marker exists in the mapMarkerData but not in the mapMarkers, create a mapMarker and display it
        else if (mapMarkerData.length > mapMarkers.length) {
            //cycle through marker data
            mapMarkerData.forEach(markerData => {
                //for the current marker data see if a marker already exists
                let indexOfMatchedMarker = mapMarkers.findIndex(marker => {
                    return marker.position.lat() === markerData[0] && marker.position.lng() === markerData[1]
                })
                //if a marker doesn't exist for that marker data, create one and set it to the map
                if (indexOfMatchedMarker === -1) {
                    const myMarker = new window.google.maps.Marker({
                        position: { lat: markerData[0], lng: markerData[1] },
                        myMap,
                        icon: "https://creekvt.com/races/RacerIcon.png",
                        title: "Hello World!",
                    });
                    myMarker.setMap(myMap)
                    setMapMarkers(prev => {
                        prev.push(myMarker)
                        return prev
                    })
                }
            })
        }
        //less markerData than markers means we need to remove a marker from the map
        else if (mapMarkerData.length < mapMarkers.length) {
            //cycle through mapMarkers.  if a markers lat/lng is not found in the mapMarkerData, note it's index, then unset it from the map and update the mapMarkers array
            mapMarkers.forEach((marker, i) => {
                //determine if a marker can be found in the markerData (will give us back -1 if the marker is not found)
                let isMarkerUnmatched = mapMarkerData.findIndex(markerData => {
                    return marker.position.lat() === markerData[0] && marker.position.lng() === markerData[1]
                })
                //if the marker is not found remove it from the map, and update the mapMarkers array
                if (isMarkerUnmatched === -1) {
                    mapMarkers[i].setMap();
                    setMapMarkers(prev => {
                        prev.splice(i, 1)
                        return prev
                    })
                }
            })
        }
    }, [mapMarkerData])

    return <div className={`${styles["map"]}`} ref={ref} id="map">Hello~</div>;
}

export default function Map({ mapMarkerData, mapOptions }) {

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