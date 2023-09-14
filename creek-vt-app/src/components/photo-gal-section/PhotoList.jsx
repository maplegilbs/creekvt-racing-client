import { PhotoAlbum } from "react-photo-album";
import React from "react";
import "./PhotoStyle.css";
const PhotoList = (props) => {
  const galleryItems = props.galleryItems;
  //  console.log(props.galleryItems, "RIGHT HERE")
  let photos = [];
  galleryItems.map((item) => {
    let photo = { src: item.url, width: 400, height: 300 };
    photos.push(photo);
  });
  return (
    <>
      <PhotoAlbum layout="rows" photos={photos}>
        {photos.map((photo, index) => (
          <img key={index} src={photo.src} alt={`Photo ${index}`} />
        ))}
        <p className="description">description</p>
      </PhotoAlbum>
    </>
  );
};

export default PhotoList;
