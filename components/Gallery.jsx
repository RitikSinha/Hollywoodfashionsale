import React from "react";
import ImageGallery from "react-image-gallery";

const Gallery = ({ items }) => {
  return <ImageGallery items={items} showNav={false} showPlayButton={false} />;
};

export default Gallery;
