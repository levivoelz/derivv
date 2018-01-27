import React from 'react'
import ImageCaption from 'components/ImageCaption'
import { LinearProgress } from 'material-ui/Progress'

import './ImageList.css'

export const Image = ({image, originalImage, processOne, processing}) => {
  if (processing === image.id) {
    return (
      <div className='images--image'>
        <div style={{height: image.height, width: image.width}}>
          <h4>Reprocessing...</h4>
          <LinearProgress />
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
      <img
        alt={image.name}
        width={image.width}
        height={image.height}
        src={image.src} />
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
