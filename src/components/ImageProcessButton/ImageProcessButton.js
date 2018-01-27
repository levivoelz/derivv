import React from 'react'
import Button from 'material-ui/Button'
import 'blueimp-canvas-to-blob'

export const ImageProcessButton = (props) => {
  const {image, dimensionsList, processAll} = props
  const disabled = Object.keys(image).length === 0

  const handleClick = () => {
    const configs = dimensionsList.filter(d => d.height || d.width)
    if (configs.length > 0) {
      processAll(image, configs)
    }
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
