import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ImageList from 'components/ImageList'
import DerivativesDownloader from './DerivativesDownloader'

const ImageDisplayer = (props) => {
  return (
    <div>
      <h2>Review Images</h2>
      {props.images.length > 0 && <DerivativesDownloader />}
      <ImageList {...props} />
      {props.images.length > 0 && <DerivativesDownloader />}
    </div>
  )
}

ImageDisplayer.propTypes = {
  images: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  images: state.derivative.images
})

export default connect(mapStateToProps, null)(ImageDisplayer)
