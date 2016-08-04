import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import classes from './Uploader.scss'
import RaisedButton from 'material-ui/RaisedButton';

export const Uploader = ({addImage, image}) => {
  const renderContent = () => (
    image.preview
      ? <img src={image.preview} className={classes.preview} />
      : <RaisedButton label='Choose an image' fullWidth={true} />
  )

  return (
    <div className={classes.wrapper}>
      <Dropzone onDrop={addImage} style={{width: '100%', height: '100%'}} multiple={false}>
        { renderContent() }
      </Dropzone>
    </div>
  )
}

Uploader.propTypes = {
  addImage: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired
}

export default Uploader
