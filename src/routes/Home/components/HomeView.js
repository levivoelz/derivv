import React from 'react'

import ImageUploader from '../containers/ImageUploader'
import DimensionsConfigurator from '../containers/DimensionsConfigurator'
import ImageProcessor from '../containers/ImageProcessor'
import ImageDisplayer from '../containers/ImageDisplayer'

import classes from './HomeView.scss'

export const HomeView = () => (
  <div className={classes.wrapper}>
    <ImageUploader />
    <DimensionsConfigurator />
    <ImageProcessor />
    <ImageDisplayer />
  </div>
)

export default HomeView
