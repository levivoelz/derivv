import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import classes from './DownloadButton.scss'

export const DownloadButton = ({onClick, disabled}) => {
  const handleClick = () => {
    onClick()
  }

  return (
    <div className={classes['DownloadButton']}>
      <RaisedButton
        disabled={disabled}
        label='Download Derivatives'
        onTouchTap={handleClick}
        fullWidth />
    </div>
  )
}

export default DownloadButton
