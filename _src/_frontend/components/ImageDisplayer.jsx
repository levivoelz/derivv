import React from 'react'
import ImageList from '@/components/ImageList'
import { LinearProgress } from '@material-ui/core';

const ImageDisplayer = (props) => {
  if (props.processing === true) {
    return (
      <div style={{marginTop: 20, paddingTop: 5}}>
        <h4>Processing...</h4>
        <LinearProgress />
      </div>
    )
  }

  if (props.images.length === 0) {
    return null
  }

  return (
    <div>
      <h3>Review & Download Images</h3>
      <ImageList {...props} />
    </div>
  )
}

export default ImageDisplayer
