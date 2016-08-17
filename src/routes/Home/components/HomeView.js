import React from 'react'

import ImageUploader from '../containers/ImageUploader'
import DimensionsConfigurator from '../containers/DimensionsConfigurator'
import ImageProcessor from '../containers/ImageProcessor'
import ImageDisplayer from '../containers/ImageDisplayer'
import DerivativesDownloader from '../containers/DerivativesDownloader'

import classes from './HomeView.scss'

export const HomeView = () => (
  <div className={classes.wrapper}>
    <ImageUploader />

    {/* Configuration */}
    <DimensionsConfigurator />

    {/* Remove */}
    <ImageProcessor />

    {/* DerivativeReview */}
    <ImageDisplayer />

    {/* Remove */}
    <DerivativesDownloader />
  </div>
)

export default HomeView
