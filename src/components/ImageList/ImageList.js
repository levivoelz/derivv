import React from 'react'
import ImageCaption from 'components/ImageCaption'
import ImageMod from 'components/ImageMod'

export const Image = ({image, originalImage}) => {
  return (
    <div style={{padding: '20px 0'}}>
      <hr />
      <img alt='derivative' src={image.src} />
      <ImageCaption showDownload image={image} />
      <ImageMod originalImage={originalImage} image={image} />
    </div>
  )
}

export const ImageList = ({images, originalImage}) => (
  <div>
    {images.map((image, i) => <Image key={i} image={image} originalImage={originalImage} />)}
  </div>
)

export default ImageList
