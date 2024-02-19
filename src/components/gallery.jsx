//Components
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import PhotoAlbum from 'react-photo-album'
//Constants
import { galleryImages } from '../constants.js'
//Hooks
import { useState } from 'react'
import { useParams } from 'react-router-dom'
//Styles
import 'yet-another-react-lightbox/styles.css'
import "yet-another-react-lightbox/plugins/captions.css";

export default function Gallery() {
  const { raceName } = useParams()
  const [index, setIndex] = useState(-1);

  const baseURL = `https://creekvt.com/races/${raceName.slice(0, -4)}/images/gallery`

  const slides = galleryImages[raceName].map(image => {
    return { src: `${baseURL}/${image.src}`, width: image.width, height: image.height, description: image.description, alt: image.alt, imageFit: 'contain' }
  })

  return (
    <>

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
    </>
  );

}
