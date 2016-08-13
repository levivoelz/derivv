import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import classes from './DownloadButton.scss'

export const DownloadButton = ({onClick, disabled}) => {
  return (
    <div className={classes['DownloadButton']}>
      <RaisedButton
        disabled={disabled}
        primary
        label='Download Derivatives'
        onTouchTap={onClick}
        fullWidth />
    </div>
  )
}

DownloadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default DownloadButton
