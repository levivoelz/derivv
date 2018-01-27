import React from 'react'
import IconButton from 'material-ui/IconButton'
import FileDownloadIcon from 'material-ui-icons/FileDownload'
import ImageMod from 'components/ImageMod'

import './ImageCaption.css'

const truncate = (str) => {
  if (str.length > 30) {
    return str.slice(0, 30) + '...'
  }

  return str
}

export const ImageCaption = ({image, processOne, originalImage}) => {
  return (
    <div className='image-caption'>
      <div className='image-caption--buttons'>
        <IconButton
          href={image.src}
          download={image.name}
          color='primary'
          style={{width: 30, height: 30, padding: 7}}>
          <FileDownloadIcon />
        </IconButton>
        <ImageMod
          processOne={processOne}
          originalImage={originalImage}
          image={image} />
      </div>
      <div>
        <div className='image-caption--item'>
          Name: <span title={image.name} className='image-caption--value'>{truncate(image.name)}</span>
        </div>
        <div className='image-caption--item'>
          Type: <span className='image-caption--value'>{image.extension}</span>
        </div>
        <div className='image-caption--item'>
          Width: <span className='image-caption--value'>{image.width}px</span>
        </div>
        <div className='image-caption--item'>
          Height: <span className='image-caption--value'>{image.height}px</span>
        </div>
      </div>
    </div>
  )
}

export default ImageCaption
