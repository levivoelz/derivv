import React from 'react'
import { connect } from 'react-redux'

import ImageList from 'components/ImageList'
import DerivativesDownloader from './DerivativesDownloader'

const ImageDisplayer = (props) => {
  return (
    <div>
      <h2>Review Images</h2>
      <DerivativesDownloader />
      <ImageList {...props} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  images: state.derivative.images
})

export default connect(mapStateToProps, null)(ImageDisplayer)
