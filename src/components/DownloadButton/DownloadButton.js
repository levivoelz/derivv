import React from 'react'
import Button from 'material-ui/Button'

export const DownloadButton = ({onClick, disabled}) => {
  if (disabled) {
    return null
  }

  return (
    <Button
      color='primary'
      variant='raised'
      style={{marginTop: 10}}
      onClick={onClick}>
        Download All
      </Button>
  )
}

export default DownloadButton
