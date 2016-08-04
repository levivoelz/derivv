import React from 'react'
import classes from './ImageList.scss'

export const Image = ({image}) => {
  return (
    <div style={{padding: '20px 0'}}>
      <img src={image.src} />
      <div>Name: {image.name}</div>
      <div>Type: {image.extension}</div>
    </div>
  )
}

export const ImageList = ({images}) => (
  <div className={classes['ImageList']}>
    {images.map((image, i) => <Image key={i} image={image} />)}
  </div>
)

export default ImageList
