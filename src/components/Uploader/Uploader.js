import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import './Uploader.css'

// ImagePreview
import placeholder from './assets/image-placeholder.svg'

import { Button, CircularProgress } from '@material-ui/core';

export const ImagePreview = ({ image }) => {
  return (
    <img src={image || placeholder} alt='preview' className='uploader--preview' />
  )
}

const handleDrop = (images) => {
  const image = images[0];
  clearAllDerivatives()
  addImage(image)
}

const baseStyle = {
  width: '100%',
  height: '100%'
}

const activeStyle = {
  opacity: 0.5
}

function Uploader(props) {
  const {addImage, image, loading, clearAllDerivatives} = props
  const onDrop = useCallback(acceptedFiles => {
    clearAllDerivatives()
    addImage(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' })

  return (
    <div className={`uploader ${isDragActive && 'drag-active'}`} {...getRootProps()}>
      <input {...getInputProps()} />
      <div className='uploader--content'>
        <div className='uploader--left'>
          {loading
            ? <div className='uploader--content'><CircularProgress /></div>
            : <ImagePreview image={image.preview} />
          }
        </div>
        <div className='uploader--right'>
          <h2>Drop or</h2>
          <Button
            variant='contained'
            color='primary'
            style={{width: '100%', marginTop: 10}}>
            choose an image
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Uploader
