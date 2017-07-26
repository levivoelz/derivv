import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import 'blueimp-canvas-to-blob'

export const ImageProcessButton = (props) => {
  const {image, dimensionsList, processImages, enableDownload} = props
  const disabled = Object.keys(image).length === 0

  const handleClick = () => {
    processImages(dimensionsList, image).then(() => {
      enableDownload()
    })
  }

  return (
    <RaisedButton
      disabled={disabled}
      primary
      label='Create Derivatives'
      onClick={handleClick}
      fullWidth />
  )
}

ImageProcessButton.propTypes = {
  image: PropTypes.object.isRequired,
  dimensionsList: PropTypes.array.isRequired,
  processImages: PropTypes.func.isRequired,
  enableDownload: PropTypes.func.isRequired
}

export default ImageProcessButton
