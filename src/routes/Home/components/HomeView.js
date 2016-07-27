import React from 'react'

import ImageUploader from '../containers/ImageUploader'
import DimensionsConfigurator from '../containers/DimensionsConfigurator'

export const HomeView = () => (
  <div>
    <ImageUploader />
    <DimensionsConfigurator />
  </div>
)

export default HomeView
