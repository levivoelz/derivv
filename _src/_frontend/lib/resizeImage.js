import downscaleImage from './downscale'

const resizeImage = (src, config) => {
  let image = new Image()
  image.src = src

  return new Promise((resolve, reject) => {
    image.onload = () => {
      downscaleImageByProperScale(image, config).then(image => {
        resizeByType(image, config).then(resolve, reject)
      }).catch(reject)
    }
  })
}

const downscaleImageByProperScale = (image, config) => {
  const scale = setScale(image, config)

  if (scale) {
    return downscaleImage(image, scale)
  }

  return new Promise((resolve, reject) => {
    resolve(image)
  })
}

const setScale = (image, config) => {
  let scale

  if (imageLargerThanConfig(image, config)) {
    scale = getLargerConfigDimension(config) / getShorterImageDimension(image)

    if (!config.height) {
      scale = config.width / image.width
    }

    if (!config.width) {
      scale = config.height / image.height
    }

    if (isImageAndConfigProportional(image, config)) {
      scale =  config.width / image.width // width or height (doesn't matter)
    }
  }

  return scale
}

const isImageAndConfigProportional = (image, config) => {
  return image.width === image.height && config.width === config.height
}

const imageLargerThanConfig = (image, config) => {
  return getShorterImageDimension(image) > getLargerConfigDimension(config)
}

const getShorterImageDimension = (image) => (
  Math.min(image.width, image.height)
)

const getLargerConfigDimension = (config) => (
  Math.max(config.width, config.height)
)

const resizeByType = (image, config) => {
  let resizeFunc

  switch (config.resizeType) {
    case 'resizeProportionally':
      resizeFunc = resizeProportionally
      break
    case 'resizeByCoordinates':
      resizeFunc = resizeByCoordinates
      break
    default:
      resizeFunc = resizeToFill
  }

  return resizeFunc(image, config)
}

const resizeToFill = (image, config) => {
  const target = setTargetImageSize(image, config)

  const offset = {
    x: getCenterOffset(config.width, target.width),
    y: getCenterOffset(config.height, target.height)
  }

  return createImage(image, offset, config, target)
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
  const target = setTargetImageSize(image, config)

  const offset = {
    x: -Math.ceil(config.x * target.width),
    y: -Math.ceil(config.y * target.height)
  }

  return createImage(image, offset, config, target)
}

const setTargetImageSize = (image, config) => {
  const target = {}
  const scale = {
    x: config.width / image.width,
    y: config.height / image.height
  }

  if (scale.x >= scale.y) {
    target.width = Math.ceil(scale.x * image.width)
    target.height = Math.ceil(scale.x * image.height)
  } else {
    target.width = Math.ceil(scale.y * image.width)
    target.height = Math.ceil(scale.y * image.height)
  }

  return target
}

const getCenterOffset = (targetDimension, originDimension) => (
  Math.floor(getCenter(targetDimension) - getCenter(originDimension))
)

const getCenter = dimension => dimension / 2

const createImage = (image, offset, config, target) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    canvas.width = config.width
    canvas.height = config.height

    const width = target.width || config.width
    const height = target.height || config.height

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

export default resizeImage
