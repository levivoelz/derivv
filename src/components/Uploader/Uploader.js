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
  return (
    <img src={image || placeholder} className={classes.preview} />
  )
}

ImagePreview.propTypes = {
  image: PropTypes.string
}

export const Uploader = (props) => {
  const {addImage, image, loading, clearAllDerivatives} = props
  const renderContent = () => {
    return (
      <div className={classes.content}>
        <div className={classes.left}>
          {loading
            ? <div className={classes.content}><CircularProgress /></div>
            : <ImagePreview image={image.preview} />
          }
        </div>
        <div className={classes.right}>
          <h2>Drop or</h2>
          <RaisedButton
            label='choose an image'
            fullWidth
            primary
            style={{marginTop: 10}} />
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
