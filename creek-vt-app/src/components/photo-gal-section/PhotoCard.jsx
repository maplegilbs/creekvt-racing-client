import { Card, CardBody, CardText } from "reactstrap";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_GETALL_PHOTOS } from "../../constants/endpoints";

const PhotoCard = ({galleryItems}) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get(API_GETALL_PHOTOS)
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      {/* {galleryItems.map((photo) => (
        <Card key={photo.id} className="mb-" style={{ width: "100%" }}>
          <img alt={photo.url} src={photo.url} />
          <CardBody>
            <CardText>Race ID: {photo.raceId}</CardText>
            <CardText>Athlete ID: {photo.athleteId}</CardText>
            <CardText>Race Year: {photo.raceYear}</CardText>
            <CardText>WINNINGGGGG</CardText>
          </CardBody>
        </Card>
      ))} */}
    </>
  );
};

export default PhotoCard;