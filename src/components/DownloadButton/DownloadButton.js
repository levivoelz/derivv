import React from 'react'
import Button from 'material-ui/Button'

export const DownloadButton = ({downloadAll, disabled}) => {
  if (disabled) {
    return null
  }

  return (
    <Button
      color='primary'
      raised
      style={{marginTop: 10}}
      onClick={downloadAll}>
        Download All
      </Button>
  )
}

export default DownloadButton
