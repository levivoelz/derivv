import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ImageList from 'components/ImageList'
import DerivativesDownloader from './DerivativesDownloader'

const ImageDisplayer = (props) => {
  if (props.processing) {
    return <div style={{height: 400}}><h2>Processing..</h2></div>
  }

  if (props.images.length === 0) {
    return <div style={{height: 400}}></div>
  }

  return (
    <div>
      <h2>Review & Download Images</h2>
      <ImageList {...props} />
      <DerivativesDownloader />
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
