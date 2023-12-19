import React from 'react'
import FileDownloadIcon from '@material-ui/icons/GetApp'
import ImageMod from '@/components/ImageMod'
import './ImageCaption.css'

import { IconButton } from '@material-ui/core';

const truncate = (str, width) => {
  const thresh = Math.max(Math.floor(width / 12), 20)
  if (str.length > thresh) {
    return str.slice(0, thresh) + '...'
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
          title='Download only this image'
          color='primary'
          style={{width: 30, height: 30, padding: 7}}>
          <FileDownloadIcon />
        </IconButton>
        <ImageMod
          processOne={processOne}
          originalImage={originalImage}
          image={image} />
      </div>
      <div className='image-caption--text'>
        <div className='image-caption--item'>
          Name: <span title={image.name} className='image-caption--value'>
            {truncate(image.name, image.width)}
          </span>
        </div>
        <div className='image-caption--item'>
          Type: <span className='image-caption--value'>{image.extension}</span>
        </div>
      </div>
      <div>
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
