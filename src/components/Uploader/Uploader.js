import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import classes from './Uploader.scss'

export const Uploader = ({addImage, image}) => {
  return (
    <div className={classes.wrapper}>
      <Dropzone onDrop={addImage} multiple={false}>
        {image.preview ? <img src={image.preview} width='100' /> : null}
        <div>Upload image</div>
      </Dropzone>
    </div>
  )
}

Uploader.propTypes = {
  addImage: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired
}

export default Uploader
