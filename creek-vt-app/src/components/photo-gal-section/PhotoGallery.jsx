import { API_VIEWBY_RACE_PHOTOS } from "../../constants/endpoints";
import React, { useState, useEffect, useContext } from "react";
import PhotoList from "./PhotoList";
import urlBuilder from "../util/urlBuilder";
import { UserContext } from "../store/UserContext";
import { Dropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DropdownItem, DropdownMenu } from "reactstrap";
const PhotoGallery = (props) => {
  const userctx = useContext(UserContext);
  const [galleryItems, setGalleryItems] = useState([]);
  const [data, setData] = useState([]);
  const { raceName, year } = useParams();

  async function fetchPhotoGallery() {
    // const raceName = userctx.race?.name
    try {
      let requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        API_VIEWBY_RACE_PHOTOS + raceName,
        requestOptions
      );
      const data = await response.json();
      //  setGalleryItems(data.photos) ;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (userctx.race) {
      fetchPhotoGallery();
    }
  }, []);
  useEffect(() => {
    if (raceName) {
      fetchPhotoGallery();
    }
  }, []);
  // Fetching raceYear
  async function fetchRaceYear() {
    try {
      let requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        API_VIEWBY_RACE_PHOTOS + raceName,
        requestOptions
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (year === "all-photos") {
      setGalleryItems(data.photos);
    } else {
      const filteredPhotos = data?.photos?.filter(
        (photo) => photo.raceYear == year
      );
      setGalleryItems(filteredPhotos);
    }
  }, [year, data]);

  const navigate = useNavigate();
  function handleRaceYearClick(raceYear) {
    navigate("/photoGallery/" + raceName + `/${raceYear}`);
  }

  // let uniqueYears = []; //[2022,2023]

  // returnedData.forEach(result => {
  //     if (!uniqueYears.includes(result.raceYear)) {
  //         uniqueYears.push(result.raceYear)
  //     }
  // })

  // console.log(uniqueYears)

  // uniqueYears.map(year => {
  //     return (
  //         <ComponentName props clickhandler = { () => handleclick({year})} />
  //     )
  // }
  let pulledYears = [];
  data?.photos?.forEach((item) => {
    if (!pulledYears.includes(item.raceYear)) {
      pulledYears.push(item.raceYear);
    }
  });

  let dropItems = pulledYears.map((year) => {
    return (
      <Dropdown.Item onClick={() => handleRaceYearClick(year)}>
        {year}
      </Dropdown.Item>
    );
  });
  return (
    <>
      <h2 id="gallery-header">
        {" "}
        {data.photos ? data.photos[0]?.raceName : ""}{" "}
      </h2>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort Photos
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleRaceYearClick("all-photos")}>
            All Photos
          </Dropdown.Item>
          {dropItems}
        </Dropdown.Menu>
      </Dropdown>
      {galleryItems && <PhotoList galleryItems={galleryItems} />}
    </>
  );
};
export default PhotoGallery;
