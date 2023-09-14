import { PhotoAlbum } from "react-photo-album";
import React from "react";
import "./PhotoStyle.css"


const PhotoList = (props) => {

  const galleryItems = props.galleryItems
//  console.log(props.galleryItems, "RIGHT HERE")
let photos = []
galleryItems.map((item) => {
  let photo = {src: item.url, width: 400, height: 300, alt: item.raceYear}
  photos.push(photo)
 
});
console.log(photos)
  return ( 
    <>
  <PhotoAlbum layout="rows"
   photos={photos}
  renderPhoto={({ layout, layoutOptions, imageProps: { src, alt, style, raceYear, index, ...restImageProps } }) => (
    <div style={{
      border: "2px solid #eee",
      borderRadius: "4px",
      boxSizing: "content-box",
      alignItems: "center",
      width: style?.width,
      padding: `${layoutOptions.padding - 2}px`,
      paddingBottom: 0,
      position: "relative"
  }}>
    
      <img src={src} alt={alt} style={{...style, width: "100%"}} {...restImageProps} />
      <p className="overlay">Photo taken in {alt}</p>
  </div>
)}
  />
  </>
  ); 
}


export default PhotoList;
