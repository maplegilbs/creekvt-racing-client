import { API_VIEWBY_RACE_PHOTOS } from "../../constants/endpoints";
import React, { useState, useEffect, useContext } from 'react';
import PhotoList from "./PhotoList"
import urlBuilder from "../util/urlBuilder"
import { UserContext } from "../store/UserContext";
import { Dropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const PhotoGallery = (props) => {
    const userctx = useContext(UserContext);
   const [galleryItems, setGalleryItems] = useState([]);
   const [data, setData] = useState([]);
   const {raceName, year} = useParams()
   
   async function fetchPhotoGallery(){
    // const raceName = userctx.race?.name   
    try {
            let requestOptions ={
                method: "GET",
            }
            const response = await fetch(API_VIEWBY_RACE_PHOTOS + raceName, requestOptions)
            const data = await response.json();
             console.log(data.photos);
            //  setGalleryItems(data.photos) ;
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

  useEffect(() => {
     if (year === "all-photos") {
        setGalleryItems(data.photos);
        console.log(galleryItems)
    } else {
        console.log(data.photos)
        const filteredPhotos = data?.photos?.filter(photo => photo.raceYear == year);
        console.log(filteredPhotos)
        setGalleryItems(filteredPhotos);
    }
  }, [year, data]);
   
   
   const navigate = useNavigate();
   function handleRaceYearClick(raceYear) {
    navigate("/photoGallery/" + raceName + `/${raceYear}`);
  }
   return ( 
    <>
    <h2 id="gallery-header"> {data.photos ? data.photos[0]?.raceName : ""} </h2>
     <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Sort Photos
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleRaceYearClick("all-photos")} >All Photos</Dropdown.Item>
        <Dropdown.Item onClick={() => handleRaceYearClick("2009")}>2009</Dropdown.Item>
        <Dropdown.Item onClick={() => handleRaceYearClick("2010")}>2010</Dropdown.Item>
        <Dropdown.Item onClick={() => handleRaceYearClick("2011")}>2011</Dropdown.Item>
        <Dropdown.Item onClick={() => handleRaceYearClick("2013")}>2013</Dropdown.Item>
        <Dropdown.Item onClick={() => handleRaceYearClick("2014")}>2014</Dropdown.Item>
        <Dropdown.Item onClick={() => handleRaceYearClick("2015")}>2015</Dropdown.Item>
        <Dropdown.Item onClick={() => handleRaceYearClick("2016")}>2016</Dropdown.Item>
        <Dropdown.Item onClick={() => handleRaceYearClick("2018")}>2018</Dropdown.Item>
        <Dropdown.Item onClick={() => handleRaceYearClick("2019")}>2019</Dropdown.Item>
        <Dropdown.Item onClick={() => handleRaceYearClick("2023")}>2023</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
     {galleryItems && <PhotoList galleryItems={galleryItems}/>}
     
    </> 
  );
}

export default PhotoGallery;