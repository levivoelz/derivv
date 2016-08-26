import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import resizeImage from 'lib/resizeImage'
import 'blueimp-canvas-to-blob'

export const ImageProcessButton = (props) => {
  const {image, dimensionsList, addDerivative, enableDownload} = props
  const disabled = Object.keys(image).length === 0

  const handleClick = () => {
    const imageNameArr = image.name.split('.')
    const extension = imageNameArr.splice(imageNameArr.length - 1, 1).join()
    const imageName = imageNameArr.join()

    dimensionsList.forEach((dimensions, i) => {
      resizeImage(image.preview, dimensions, 'resizeToFill').then((blob) => {
        addDerivative({
          originalName: imageName,
          id: dimensions.id,
          src: URL.createObjectURL(blob),
          width: dimensions.width,
          height: dimensions.height,
          blob,
          name: `${imageName}_${dimensions.width}_x_${dimensions.height}`,
          extension
        })
      })
    })

    enableDownload()
  }

  return (
    <RaisedButton
      disabled={disabled}
      primary
      label='Create Derivatives'
      onTouchTap={handleClick}
      fullWidth />
  )
}

ImageProcessButton.propTypes = {
  image: PropTypes.object.isRequired,
  dimensionsList: PropTypes.array.isRequired,
  addDerivative: PropTypes.func.isRequired,
  enableDownload: PropTypes.func.isRequired
}

export default ImageProcessButton
