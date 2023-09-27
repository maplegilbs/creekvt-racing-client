import { PhotoAlbum } from "react-photo-album";
import React from "react";
import "./PhotoStyle.css"
import { useEffect, useState } from "react";

const PhotoList = (props) => {

  const galleryItems = props.galleryItems
//  console.log(props.galleryItems, "RIGHT HERE")
let photos = []
const [showOverlay, setShowOverlay] = useState(false);
galleryItems.map((item) => {
  let photo = {src: item.url, width: 400, height: 300, alt: item.raceYear}
  photos.push(photo)
 
});
useEffect(() => {
  setShowOverlay(false)
  setTimeout(() => setShowOverlay(true), 500)
}, [galleryItems]);

const styles = photos.length < 2 ? {maxWidth: "414px"} : {}
  return ( 
    <>
  <PhotoAlbum layout="rows" style={{justifyContent: "center"}}
   photos={photos}
  renderPhoto={({ layout, layoutOptions, imageProps: { src, alt, style, raceYear, index, ...restImageProps } }) => (
    <div style={{
      border: showOverlay ? "2px solid #eee": "0 solid #eee",
      borderRadius: "4px",
      boxSizing: "content-box",
      alignItems: "center",
      width: style?.width, 
      padding: `${layoutOptions.padding - 2}px`,
      paddingBottom: 0,
      position: "relative",
      ...styles
  }}>
    
      <img src={src} alt={alt} style={{...style, width: "100%"}} {...restImageProps} />
      {showOverlay && <p className="overlay">Photo taken in {alt}</p>} 
  </div>
)}
  />
  </>
  ); 
}


export default PhotoList;
