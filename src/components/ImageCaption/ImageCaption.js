import React, { PropTypes } from 'react'
import classes from './ImageCaption.scss'
import IconButton from 'material-ui/IconButton'
import FileDownload from 'material-ui/svg-icons/file/file-download'

export const ImageCaption = ({image, showDownload}) => {
  let downloadButton

  if (showDownload) {
    downloadButton = (
      <div className={classes.download}>
        <IconButton href={image.src} download style={{width: 30, height: 30, padding: 7}}>
          <FileDownload color='#57ac89' />
        </IconButton>
      </div>
    )
  }

  return (
    <div className={classes.wrapper}>
      {downloadButton}
      <div>
        <div className={classes.item}>
          Name: <span className={classes.value}>{image.name}</span>
        </div>
        <div className={classes.item}>
          Type: <span className={classes.value}>{image.extension}</span>
        </div>
      </div>
      <div>
        <div className={classes.item}>
          Width: <span className={classes.value}>{image.width}px</span>
        </div>
        <div className={classes.item}>
          Height: <span className={classes.value}>{image.height}px</span>
        </div>
      </div>
    </div>
  )
}

ImageCaption.propTypes = {
  image: PropTypes.object.isRequired,
  showDownload: PropTypes.bool
}

export default ImageCaption
