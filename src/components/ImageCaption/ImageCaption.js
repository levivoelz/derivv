import React from 'react'
import IconButton from 'material-ui/IconButton'
import FileDownloadIcon from 'material-ui-icons/FileDownload'

import './ImageCaption.css'

export const ImageCaption = ({image, showDownload}) => {
  let downloadButton

  if (showDownload) {
    downloadButton = (
      <div className='image-caption--button'>
        <IconButton
          href={image.src}
          download
          color='primary'
          style={{width: 30, height: 30, padding: 7}}>
          <FileDownloadIcon />
        </IconButton>
      </div>
    )
  }

  return (
    <div className='image-caption'>
      {downloadButton}
      <div>
        <div className='image-caption--item'>
          Name: <span className='image-caption--value'>{image.name}</span>
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
