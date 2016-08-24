import React, { PropTypes } from 'react'
import classes from './ImageList.scss'

export const Image = ({image}) => {
  return (
    <div style={{padding: '20px 0'}}>
      <hr />
      <img src={image.src} />
      <div>Name: {image.name}</div>
      <div>Type: {image.extension}</div>
    </div>
  )
}

Image.propTypes = {
  image: PropTypes.object.isRequired
}

export const ImageList = ({images}) => (
  <div className={classes['ImageList']}>
    {images.map((image, i) => <Image key={i} image={image} />)}
  </div>
)

ImageList.propTypes = {
  images: PropTypes.array.isRequired
}

export default ImageList
