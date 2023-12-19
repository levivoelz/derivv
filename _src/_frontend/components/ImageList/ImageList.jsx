import React from 'react'
import ImageCaption from '@/components/ImageCaption'
import './ImageList.css'

import { LinearProgress } from '@material-ui/core';

export const Image = ({image, originalImage, processOne, processing}) => {
  if (processing === image.id) {
    return (
      <div className='images--image'>
        <div className='reprocessing' style={{height: image.height}}>
          <div style={{width: image.width * 1.5}}>
            <h4>Reprocessing...</h4>
            <LinearProgress />
          </div>
        </div>
        <ImageCaption
          processOne={processOne}
          originalImage={originalImage}
          image={image} />
      </div>
    )
  }

  return (
    <div className='images--image'>
      <div className='images--images'>
        <div className='images--retina'>
          <h5>Retina Preview (2x)</h5>
          <img
            alt={image.name}
            width={image.width / 2}
            height={image.height / 2}
            src={image.src} />
        </div>
        <div className='images--regular'>
          <h5>Regular preview</h5>
          <img
            alt={image.name}
            width={image.width}
            height={image.height}
            src={image.src} />
        </div>
      </div>
      <ImageCaption
        processOne={processOne}
        originalImage={originalImage}
        image={image} />
    </div>
  )
}

export const ImageList = ({images, originalImage, processOne, processing}) => (
  <div className='images--list'>
    {images.map((image, i) => (
      <Image
        key={i}
        image={image}
        processOne={processOne}
        processing={processing}
        originalImage={originalImage} />
    ))}
  </div>
)

export default ImageList
