import React, { PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import classes from './Uploader.scss'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

// ImagePreview
import placeholder from './assets/image-placeholder.svg'

const propTypes = {
  addImage: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  clearAllDerivatives: PropTypes.func.isRequired
}

export const ImagePreview = ({image}) => {
  if (!image) { return <img src={placeholder} /> }

  return (
    <div>
      <img src={image} className={classes.preview} />
    </div>
  )
}

ImagePreview.propTypes = {
  image: PropTypes.object
}

export const Uploader = ({addImage, image, loading, clearAllDerivatives}) => {
  const renderContent = () => {
    if (loading) {
      return <div className={classes.content}><CircularProgress /></div>
    }

    return (
      <div className={classes.content}>
        <div className={classes.left}>
          <ImagePreview image={image.preview} />
        </div>
        <div className={classes.right}>
          <h2>Drop or</h2>
          <RaisedButton label='choose an image' fullWidth primary style={{marginTop: 10}} />
        </div>
      </div>
    )
  }

  const handleDrop = (files) => {
    clearAllDerivatives()
    addImage(files[0])
  }

  const baseStyle = {
    width: '100%',
    height: '100%'
  }

  const activeStyle = {
    opacity: 0.5
  }

  return (
    <div className={classes.wrapper}>
      <Dropzone
        onDrop={handleDrop}
        activeStyle={activeStyle}
        style={baseStyle}
        multiple={false}>
        {renderContent()}
      </Dropzone>
    </div>
  )
}

Uploader.propTypes = propTypes

export default Uploader
