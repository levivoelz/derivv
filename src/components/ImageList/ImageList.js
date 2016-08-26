import React, { PropTypes } from 'react'
import ImageCaption from 'components/ImageCaption'
import classes from './ImageList.scss'

export const ImageList = ({images}) => (
  <div className={classes['ImageList']}>
    {images.map((image, i) => <Image key={i} image={image} />)}
  </div>
)

ImageList.propTypes = {
  images: PropTypes.array.isRequired
}

export const Image = ({image}) => {
  return (
    <div style={{padding: '20px 0'}}>
      <hr />
      <img src={image.src} />
      <ImageCaption showDownload image={image} />
    </div>
  )
}

Image.propTypes = {
  image: PropTypes.object.isRequired
}

export default ImageList
