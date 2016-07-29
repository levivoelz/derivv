import React from 'react'
import classes from './ImageList.scss'

export const ImageList = ({images}) => (
  <div className={classes['ImageList']}>
    {images.map((image, i) => <img key={i} src={image} />)}
  </div>
)

export default ImageList
