import React from 'react'
import { Button } from '@material-ui/core';

export const DownloadButton = ({onClick, disabled}) => {
  if (disabled) {
    return null
  }

  return (
    <Button
      color='primary'
      variant='contained'
      style={{marginTop: 10}}
      onClick={onClick}>
        Download All
      </Button>
  )
}

export default DownloadButton
