import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import classes from './DownloadButton.scss'

export const DownloadButton = ({onClick, disabled}) => {
  return (
    <div className={classes['DownloadButton']}>
      <RaisedButton
        disabled={disabled}
        primary
        style={{marginTop: 10}}
        label='Download All'
        onClick={onClick} />
    </div>
  )
}

DownloadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default DownloadButton
