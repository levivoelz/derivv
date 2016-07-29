import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import resizeImage from 'lib/resizeImage'

import classes from './ImageProcessButton.scss'

export const ImageProcessButton = (props) => {
  const {image, dimensionsList, addDerivative} = props
  const disabled = Object.keys(image).length === 0

  const handleClick = () => {
    dimensionsList.forEach((dimensions) => {
      resizeImage(image.preview, dimensions, (img) => {
        addDerivative(img);
      })
    })
  }

  return (
    <RaisedButton
      disabled={disabled}
      label='Process'
      onTouchTap={handleClick}
      fullWidth={true} />
  )
}

export default ImageProcessButton
