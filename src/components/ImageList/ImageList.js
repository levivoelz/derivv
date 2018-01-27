import React from 'react'
import ImageCaption from 'components/ImageCaption'

export const Image = ({image, originalImage, processOne}) => {
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

export const ImageList = ({images, originalImage, processOne}) => (
  <div>
    {images.map((image, i) => (
      <Image
        key={i}
        image={image}
        processOne={processOne}
        originalImage={originalImage} />
    ))}
  </div>
)

export default ImageList
