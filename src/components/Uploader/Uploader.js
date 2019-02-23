import React from 'react'
import Dropzone from 'react-dropzone'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'

import './Uploader.css'

// ImagePreview
import placeholder from './assets/image-placeholder.svg'

export const ImagePreview = ({image}) => {
  return (
    <img src={image || placeholder} alt='preview' className='uploader--preview' />
  )
}

export const Uploader = (props) => {
  const {addImage, image, loading, clearAllDerivatives} = props
  const renderContent = () => {
    return (
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
            variant='raised'
            color='primary'
            style={{width: '100%', marginTop: 10}}>
            choose an image
          </Button>
        </div>
      </div>
    )
  }

  const handleDrop = (images) => {
    const image = images[0];

    clearAllDerivatives()

    if (image.size > 10000000) {
      alert('Choose an image smaller than 10mb')
      return
    }

    addImage(image)
  }

  const baseStyle = {
    width: '100%',
    height: '100%'
  }

  const activeStyle = {
    opacity: 0.5
  }

  return (
    <div className='uploader'>
      <Dropzone
        accept='image/*'
        onDrop={handleDrop}
        activeStyle={activeStyle}
        style={baseStyle}
        multiple={false}>
        {renderContent()}
      </Dropzone>
    </div>
  )
}

export default Uploader
