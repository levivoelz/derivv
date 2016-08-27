import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CircularProgress from 'material-ui/CircularProgress'

import ImageList from 'components/ImageList'
import DerivativesDownloader from './DerivativesDownloader'

const ImageDisplayer = (props) => {
  const progressStyles = {
    verticalAlign: 'top',
    width: 30,
    height: 30,
    marginTop: -2
  }

  const renderLoader = () => <CircularProgress size={0.4} style={progressStyles} />

  return (
    <div>
      <h2>Review Images {props.processing && renderLoader()}</h2>
      {props.images.length > 0 && <DerivativesDownloader />}
      <ImageList {...props} />
      {props.images.length >= 3 && <DerivativesDownloader />}
    </div>
  )
}

ImageDisplayer.propTypes = {
  images: PropTypes.array.isRequired,
  processing: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  images: state.derivative.images,
  processing: state.derivative.acting
})

export default connect(mapStateToProps, null)(ImageDisplayer)
