import React from 'react'
import Button from 'material-ui/Button'
import 'blueimp-canvas-to-blob'

export const ImageProcessButton = (props) => {
  const {image, dimensionsList, processAll} = props
  const disabled = Object.keys(image).length === 0

  const handleClick = () => {
    processAll(image, dimensionsList)
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
