import React from 'react'

import Uploader from '../containers/Uploader'
import Configuration from '../containers/Configuration'
import ImageProcessor from '../containers/ImageProcessor'
import ImageDisplayer from '../containers/ImageDisplayer'
import DerivativesDownloader from '../containers/DerivativesDownloader'

import classes from './HomeView.scss'

export const HomeView = () => (
  <div className={classes.wrapper}>
    <Uploader />

    {/* Configuration */}
    <Configuration />

    {/* Remove */}
    <ImageProcessor />

    {/* DerivativeReview */}
    <ImageDisplayer />

    {/* Remove */}
    <DerivativesDownloader />
  </div>
)

export default HomeView
