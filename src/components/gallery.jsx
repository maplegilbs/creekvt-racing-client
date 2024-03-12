//Components
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import PhotoAlbum from 'react-photo-album'
//Constants
import { galleryImages } from '../constants.js'
//Hooks
import { useState } from 'react'
import { useParams } from 'react-router-dom'
//Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

//Styles
import 'yet-another-react-lightbox/styles.css'
import "yet-another-react-lightbox/plugins/captions.css";
import styles from './gallery.module.css'
import { useEffect } from 'react'

export default function Gallery() {
  const { raceName } = useParams()
  const [index, setIndex] = useState(-1);
  const [photographers, setPhotographers] = useState(galleryImages[raceName].reduce((list, current) => {
    if (!list.includes(current.description.slice(13))) {
      list.push(current.description.slice(13))
    }
    return list;
  }, []));
  const [photographerDeets, setPhotographerDeets] = useState([])

  const baseURL = raceName.toLowerCase() === 'wellsriverrumble' ? `https://creekvt.com/races/wells/images/gallery` : `https://creekvt.com/races/${raceName.slice(0, -4)}/images/gallery`;

  const slides = galleryImages[raceName] ? galleryImages[raceName].map(image => {
    return { src: `${baseURL}/${image.src}`, width: image.width, height: image.height, description: image.description, alt: image.alt, imageFit: 'contain' }
  }) : [];

  useEffect(() => {
    async function getPhotographerDetails() {
      try {
        let searchQuery = photographers.join(", ");
        let resultsResponse = await fetch(`${process.env.REACT_APP_SERVER}/images/photographers?names=${searchQuery}`)
        let resultsData = await resultsResponse.json();
        setPhotographerDeets(resultsData)
      } catch (error) {
        console.log(error)
      }
    }
    getPhotographerDetails();
  }, [])

  return (
    <div className={styles["gallery"]}>
      {raceName === 'newhavenrace' ? <h6>Note most images seen here depict fairly high water from the 2019 event.</h6> : <></>}
      <PhotoAlbum
        layout="rows"
        photos={slides}
        targetRowHeight={150}
        onClick={({ index: current }) => setIndex(current)}
      />

      <Lightbox
        plugins={[Captions]}
        index={index}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
      <br />
      {photographerDeets.length > 0 &&
        <h6>A very big thanks to the following for use of their work.</h6>
      }
      <br />
      {photographerDeets.map(photographer => {
        return (
          <div key={photographer.id} className={styles["photographer"]}>
            <FontAwesomeIcon icon={faCamera} size="sm" style={{ color: "#001c40", }} />
            <h6>{photographer.name} @ <a target="_blank" className='link-std' href={photographer.url}>{photographer.url}</a></h6>
          </div>
        )
      }
      )}
    </div>
  );

}
