import React from 'react'

import Uploader from '../containers/Uploader'
import Configuration from '../containers/Configuration'
import ImageProcessor from '../containers/ImageProcessor'
import ImageDisplayer from '../containers/ImageDisplayer'
import DerivativesDownloader from '../containers/DerivativesDownloader'
import CoreLayout from 'layouts/CoreLayout'

export const HomeView = () => (
  <CoreLayout>
    <Uploader />

    {/* Configuration */}
    <Configuration />

    {/* Remove */}
    <div style={{marginBottom: 40}}></div>
    <ImageProcessor />

    {/* DerivativeReview */}
    <ImageDisplayer />
    <DerivativesDownloader />
  </CoreLayout>
)

export default HomeView
