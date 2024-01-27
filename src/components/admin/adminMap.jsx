//Contexts
import { SelectedRaceContext } from "../../pages/adminDashboard";
//Google maps
import { Wrapper } from "@googlemaps/react-wrapper";
//Hooks
import { useRef, useEffect, useState, useContext } from "react";
//Styles
import styles from "./adminMap.module.css"

function MyMapComponent({ mapMarkerData, updateLocationFromMapClick, selectedItemID, editRowRef }) {
    const selectedRace = useContext(SelectedRaceContext)[0] //Name of race with spaces i.e. "Test Race"
    const [myMap, setMyMap] = useState();
    const [mapListener, setMapListener] = useState();
    const [mapMarkers, setMapMarkers] = useState([])
    const ref = useRef();

    //When the map is updated (via a new selected race) two things change - our first useEffect fires to build a new map
    //But also the component will have been passed new mapMaker data and so the second useEffect will also run
    //If the new map has not been built yet the map markers will have been set to the old map
    //So what we want to happen is for the mapMarkers to refresh after a new map has been built
    useEffect(() => {
        const buildMap = async () => {
            const raceToFetch = selectedRace.split(' ').join('').toLowerCase();
            let mapOptionsResponse = await fetch(`${process.env.REACT_APP_SERVER}/geoInfo/mapOptions/${raceToFetch}`)
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
            setMyMap(newMap)
        }
        buildMap()

    }, [selectedRace]);

    //Should stop listening unless set location on map button clicked
    useEffect(() => {
        function mapClickAction(e) {
            updateLocationFromMapClick(e, selectedItemID)
            if (editRowRef.current) {setTimeout(()=> editRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }), 1000)}
        }
        if (selectedItemID && myMap) {
            let listenerID = myMap.addListener('click', mapClickAction)
            setMapListener(listenerID)
        }
        else if (myMap) mapListener.remove();
    }, [selectedItemID])


    //If a new map is loaded, clear the old markers and display new ones
    useEffect(() => {
        if (myMap) {
            // console.log('Clearing all markers')
            mapMarkers.forEach(marker => marker.setMap())
            setMapMarkers(() => {
                // console.log('Setting markers')
                let markers = mapMarkerData.map(markerData => {
                    const markerIcon = {
                        url: markerData.iconUrl ? markerData.iconUrl : "https://creekvt.com/races/RacerIcon.png",
                        scaledSize: new window.google.maps.Size(25, 25)
                    }
                    const newMarker = new window.google.maps.Marker({
                        position: { lat: Number(markerData.lat), lng: Number(markerData.lng) },
                        myMap,
                        icon: markerIcon,
                        title: markerData.name,
                    });
                    newMarker.setMap(myMap)
                    return newMarker
                })
                return markers
            })
        }
    }, [myMap])

    //Cycle through the previous marker.  Any that aren't in the marker data remove from the map
    //Cycle through the marker data and if a marker does not exist in the markers, add it to the map.
    useEffect(() => {
        if (myMap) {
            // console.log('Updating Markers - this should only run when you have changed the marker data directly, not via a new map render by way of selcting a different race')
            setMapMarkers(prev => {
                let filteredMarkers = prev.filter(marker => {
                    let foundMarker = mapMarkerData.findIndex(markerData => marker.position.lat() === Number(markerData.lat) && marker.position.lng() === Number(markerData.lng))
                    if (foundMarker === -1) { console.log('Filtering out old marker'); marker.setMap(null) }
                    else return true
                })
                mapMarkerData.forEach(markerData => {
                    let foundMarker = filteredMarkers.findIndex(marker => marker.position.lat() === Number(markerData.lat) && marker.position.lng() === Number(markerData.lng))
                    if (foundMarker === -1) {
                        // console.log('Adding a new marker')
                        console.log(markerData)
                        const markerIcon = {
                            url: markerData.iconUrl ? markerData.iconUrl : "https://creekvt.com/races/RacerIcon.png",
                            scaledSize: new window.google.maps.Size(25, 25)
                        }
                        const newMarker = new window.google.maps.Marker({
                            position: { lat: Number(markerData.lat), lng: Number(markerData.lng) },
                            myMap,
                            icon: markerIcon,
                            title: "Hello World!",
                        });
                        newMarker.setMap(myMap)
                        filteredMarkers.push(newMarker)
                    }
                })
                return filteredMarkers
            })
        }
    }, [mapMarkerData])


    return <div className={`${styles["map"]}`} ref={ref} id="map">Hello~</div>;
}

export default function AdminMap({ mapMarkerData, updateLocationFromMapClick, selectedItemID, editRowRef }) {
    return (
        <div className={`${styles["map-container"]}`} >
            <Wrapper apiKey={"AIzaSyBBtqHKDrsiMp-7ldVkI6QEMoxjzggJ-J8"}>
                <MyMapComponent mapMarkerData={mapMarkerData} selectedItemID={selectedItemID} updateLocationFromMapClick={updateLocationFromMapClick} editRowRef={editRowRef} />
            </Wrapper>
        </div>
    )
}