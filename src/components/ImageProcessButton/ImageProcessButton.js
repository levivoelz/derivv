import React from 'react'
import Button from 'material-ui/Button'
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
    <Button
      disabled={disabled}
      color='primary'
      raised
      onClick={handleClick}
      style={{width: '100%'}}>
        Create Derivative Images
      </Button>
  )
}

export default ImageProcessButton
