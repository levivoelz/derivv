import React from 'react'

import Uploader from '../containers/Uploader'
import Configuration from '../containers/Configuration'
import ImageProcessor from '../containers/ImageProcessor'
import ImageDisplayer from '../containers/ImageDisplayer'

import classes from './HomeView.scss'

export const HomeView = () => (
  <div className={classes.wrapper}>
    <Uploader />

    {/* Configuration */}
    <Configuration />

    {/* Remove */}
    <div style={{paddingBottom: 40}}></div>
    <ImageProcessor />

    {/* DerivativeReview */}
    <ImageDisplayer />
  </div>
)

export default HomeView
