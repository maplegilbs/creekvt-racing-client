// import * as React from "react";
import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./PhotoStyle.css"
import { useResponsiveMediaQuery } from "react-responsive";



const PhotoList = (props) => {
  const { galleryItems } = props;
  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  const [isWide, setIsWide] = useState(false);

  // useResponsiveMediaQuery("(min-width: 780px)", (matches) => {
  //   setIsWide(matches);
  // });
  
  return (
    <>
     
        <ImageList
        sx={{ width: "100vw", height:"100%" }}
        variant="quilted"
        cols={isWide ? 2 : 6}
        rowHeight={250}
      > 
      
        {galleryItems.map((item, index) => (
          <ImageListItem
            key = {index}
            cols = {item.cols || 1}
            rows = {item.rows || 1}
           >
            <div className="img__wrap" >
             <img className="img__img" 
              {...srcset(item.url, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
            <p class="img__description">This race took place in {item.raceYear}</p>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
      
      
    </>
  );
};

export default PhotoList;
