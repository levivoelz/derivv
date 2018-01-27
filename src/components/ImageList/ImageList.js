import React from 'react'
import ImageCaption from 'components/ImageCaption'
import { LinearProgress } from 'material-ui/Progress'

export const Image = ({image, originalImage, processOne, processing}) => {
  if (processing === image.id) {
    return (
      <div style={{padding: '20px 0', height: image.height + 40}}>
        <hr />
        <h4>Reprocessing...</h4>
        <LinearProgress />
      </div>
    )
  }

  return (
    <div style={{padding: '20px 0'}}>
      <hr />
      <img alt='derivative' src={image.src} />
      <ImageCaption
        processOne={processOne}
        originalImage={originalImage}
        image={image} />
    </div>
  )
}

export const ImageList = ({images, originalImage, processOne, processing}) => (
  <div>
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
