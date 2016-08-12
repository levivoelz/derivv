import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import classes from './Uploader.scss'
import RaisedButton from 'material-ui/RaisedButton'

export const Uploader = ({addImageAsync, image}) => {
  const renderContent = () => (
    image.preview
      ? <img src={image.preview} className={classes.preview} />
      : <RaisedButton label='Choose or drop an image' fullWidth />
  )

  return (
    <div className={classes.wrapper}>
      <Dropzone onDrop={addImageAsync} style={{width: '100%', height: '100%'}} multiple={false}>
        {renderContent()}
      </Dropzone>
    </div>
  )
}

Uploader.propTypes = {
  addImageAsync: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired
}

export default Uploader
