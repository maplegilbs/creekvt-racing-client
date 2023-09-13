import { API_GETALL_PHOTOS } from "../../constants/endpoints";
import PhotoCard from "./PhotoCard";
import React, { useState, useEffect } from 'react';
import PhotoList from "./PhotoList"
const PhotoGallery = (props) => {
   const [galleryItems, setGalleryItems] = useState([]);

    async function fetchPhotoGallery(){
        try {
            let requestOptions ={
                method: "GET",
            }
            const response = await fetch(API_GETALL_PHOTOS, requestOptions)
            const data = await response.json();
            setGalleryItems(data.photos) 
            console.log(data.photos)
        } catch (error) {
            console.log(error)
        }
    }

   useEffect(() => {
    fetchPhotoGallery();
   }, []);
   return ( 
    <>
     <PhotoCard galleryItems={galleryItems}/>
     <PhotoList galleryItems={galleryItems}/>
    </> 
  );
}

export default PhotoGallery;