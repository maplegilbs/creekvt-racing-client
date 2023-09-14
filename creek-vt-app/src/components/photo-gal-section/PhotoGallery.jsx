import { API_VIEWBY_RACE_PHOTOS } from "../../constants/endpoints";
import React, { useState, useEffect, useContext } from 'react';
import PhotoList from "./PhotoList"
import urlBuilder from "../util/urlBuilder"
import { UserContext } from "../store/UserContext";
import { Dropdown } from "react-bootstrap";

const PhotoGallery = (props) => {
   const [galleryItems, setGalleryItems] = useState([]);
   const [data, setData] = useState([]);
   const [selectedYear, setSelectedYear] = useState("All Photos");
   const userctx = useContext(UserContext);
   
   async function fetchPhotoGallery(){
    const raceName = userctx.race?.name   
    try {
            let requestOptions ={
                method: "GET",
            }
            const response = await fetch(API_VIEWBY_RACE_PHOTOS + urlBuilder(raceName), requestOptions)
            const data = await response.json();
             console.log(data.photos);
             setGalleryItems(data.photos) ;
             setData(data);
        } catch (error) {
            console.log(error)
        }
    }
   useEffect(() => {
    if (userctx.race){
        fetchPhotoGallery();
    }
    
   }, []);

   console.log(data.photos)
   const filterPhotosByYear = (year) => {
    if (year === "All Photos") {
        setGalleryItems(data.photos);
        console.log(galleryItems)
    } else {
        console.log(data.photos)
        const filteredPhotos = data.photos.filter(photo => photo.raceYear == year);
        console.log(filteredPhotos)
        setGalleryItems(filteredPhotos);
    }
    setSelectedYear(year);
   }

   return ( 
    <>
    <h2 id="gallery-header"> {data.photos ? data.photos[0].raceName : ""} </h2>
     <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Sort Photos
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => filterPhotosByYear("All Photos")} href="#/action-1">All Photos</Dropdown.Item>
        <Dropdown.Item onClick={() => filterPhotosByYear("2002")} href="#/action-2">2002</Dropdown.Item>
        <Dropdown.Item onClick={() => filterPhotosByYear("2004")} href="#/action-3">2004</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
     <PhotoList galleryItems={galleryItems}/>
     
    </> 
  );
}

export default PhotoGallery;