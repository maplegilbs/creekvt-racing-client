import { API_GETALL_PHOTOS } from "../../constants/endpoints";
import React, { useState, useEffect } from 'react';
import PhotoList from "./PhotoList"
const PhotoGallery = (props) => {
   const [galleryItems, setGalleryItems] = useState([]);
   const raceName = "New Haven Ledges Race"
    async function fetchPhotoGallery(){
        try {
            let requestOptions ={
                method: "GET",
            }
            const response = await fetch(API_GETALL_PHOTOS, requestOptions)
            const data = await response.json();
            setGalleryItems(data.photos) 
        } catch (error) {
            console.log(error)
        }
    }

   useEffect(() => {
    fetchPhotoGallery();
   }, []);
   return ( 
    <>
     
     <PhotoList galleryItems={galleryItems}/>
     
    </> 
  );
}

export default PhotoGallery;