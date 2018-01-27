import downscaleImage from './downscale'

const resizeImage = (src, config) => {
  return new Promise((resolve, reject) => {
    let image = new Image()
    image.src = src

    image.onload = () => {
      image = downscaleImageForResize(image, config)

      resizeByType(image, config).then(resolve, reject)
    }
  })
}

const downscaleImageForResize = (image, config) => {
  try {
    if (!config.height) {
      return downscaleImage(image, config.width / image.width)
    }

    if (!config.width) {
      return downscaleImage(image, config.height / image.height)
    }

    const largerOrig = findLarger(image)
    const largerDest = findLarger(config)
    const smallerOrigDim = Math.min(image.width, image.height)
    const largerDestDim = Math.max(config.width, config.height)

    if (largerOrig === 'same' && largerDest === 'same') {
      return downscaleImage(image, config.width / image.width) // width or height (doesn't matter)
    }

    if (smallerOrigDim > largerDestDim) {
      return downscaleImage(image, largerDestDim / smallerOrigDim)
    }

    return image
  } catch (e) {
    return image
  }
}

const findLarger = (dims) => {
  switch (true) {
    case dims.width > dims.height:
      return 'width'
    case dims.width < dims.height:
      return 'height'
    default:
      return 'same'
  }
}

const resizeByType = (image, config) => {
  switch (config.resizeType) {
    case 'resizeToFill':
      return resizeToFill(image, config)
    case 'resizeProportionally':
      return resizeProportionally(image, config)
    case 'resizeByCoordinates':
      return resizeByCoordinates(image, config)
    default:
      return new Error('No resize type specified')
  }
}

const resizeToFill = (image, config) => {
  const dest = setDestinationSize(image, config)

  const offset = {
    x: getCenterOffset(config.width, dest.width),
    y: getCenterOffset(config.height, dest.height)
  }

  return createImage(image, offset, config, dest)
}

const resizeProportionally = (image, config) => {
  const mask = {}

  if (config.width) {
    mask.width = config.width
    mask.height = image.height * config.width / image.width
  } else {
    mask.width = image.width * config.height / image.height
    mask.height = config.height
  }

  return createImage(image, {x: 0, y: 0}, mask, config)
}

const resizeByCoordinates = (image, config) => {
  const dest = setDestinationSize(image, config)

  const offset = {
    x: -Math.ceil(config.x * dest.width),
    y: -Math.ceil(config.y * dest.height)
  }

  return createImage(image, offset, config, dest)
}

const createImage = (image, offset, config, dest) => {
  return new Promise((resolve, reject) => {
    const canvas = createCanvas()
    const context = canvas.getContext('2d')

    canvas.width = config.width
    canvas.height = config.height

    const width = dest.width || config.width
    const height = dest.height || config.height

    context.drawImage(image, offset.x, offset.y, width, height)
    canvas.toBlob((blob) => {
      const imageObj = {
        blob,
        width: Math.floor(config.width),
        height: Math.floor(config.height)
      }

      resolve(imageObj)
    }, config.type)
  })
}

const setDestinationSize = (image, config) => {
  const dest = {}
  const scale = {
    x: config.width / image.width,
    y: config.height / image.height
  }

  if (scale.x >= scale.y) {
    dest.width = Math.ceil(scale.x * image.width)
    dest.height = Math.ceil(scale.x * image.height)
  } else {
    dest.width = Math.ceil(scale.y * image.width)
    dest.height = Math.ceil(scale.y * image.height)
  }

  return dest
}

const getCenterOffset = (targetDimension, originDimension) => (
  Math.floor(getCenter(targetDimension) - getCenter(originDimension))
)

const getCenter = dimension => dimension / 2

const createCanvas = () => document.createElement('canvas')

export default resizeImage
