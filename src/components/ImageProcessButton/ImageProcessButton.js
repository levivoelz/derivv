import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import resizeImage from 'lib/resizeImage'

import classes from './ImageProcessButton.scss'

export const ImageProcessButton = (props) => {
  const {image, dimensionsList, addDerivative} = props
  const disabled = Object.keys(image).length === 0

  const handleClick = () => {
    const imageNameArr = image.name.split('.')
    const extension = imageNameArr.splice(imageNameArr.length - 1, 1).join()
    const imageName = imageNameArr.join()

    dimensionsList.forEach((dimensions, i) => {
      resizeImage(image.preview, dimensions, (blob, base64) => {
        addDerivative({
          src: URL.createObjectURL(blob),
          blob,
          base64,
          name: `${imageName}_${dimensions.width}_x_${dimensions.height}`,
          extension
        });
      })
    })
  }

  return (
    <RaisedButton
      disabled={disabled}
      label='Process'
      onTouchTap={handleClick}
      fullWidth />
  )
}

export default ImageProcessButton