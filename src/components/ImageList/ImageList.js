import React from 'react'
import ImageCaption from 'components/ImageCaption'

export const Image = ({image}) => {
  return (
    <div style={{padding: '20px 0'}}>
      <hr />
      <img alt='derivative' src={image.src} />
      <ImageCaption showDownload image={image} />
    </div>
  )
}

export const ImageList = ({images}) => (
  <div>
    {images.map((image, i) => <Image key={i} image={image} />)}
  </div>
)

export default ImageList
