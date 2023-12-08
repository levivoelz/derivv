import React from 'react'

import CoreLayout from '@/layouts/CoreLayout'

import Uploader from '../containers/Uploader'
import Configuration from '../containers/Configuration'
import ImageProcessor from '../containers/ImageProcessor'
import ImageDisplayer from '../containers/ImageDisplayer'
import DerivativesDownloader from '../containers/DerivativesDownloader'
import ConfigExport from '../containers/ConfigExport'
import ConfigImport from '../containers/ConfigImport'

export const HomeView = () => (
  <CoreLayout>
    <Uploader />

    <h3>Configure Sizes</h3>
    <div style={{display: 'flex'}}>
      <ConfigImport />
      <ConfigExport />
    </div>
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
