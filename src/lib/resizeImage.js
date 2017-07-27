import downscaleImage from './downscale'

const resizeImage = (src, dimensions, type) => {
  return new Promise((resolve, reject) => {
    let image = new Image()
    image.src = src

    image.onload = () => {
      image = downscaleImageForResize(image, dimensions)

      resizeByType(type, image, dimensions).then(resolve, reject)
    }
  })
}

const downscaleImageForResize = (image, dimensions) => {
  try {
    if (!dimensions.height) {
      return downscaleImage(image, dimensions.width / image.width)
    }

    if (!dimensions.width) {
      return downscaleImage(image, dimensions.height / image.height)
    }

    const largerOrig = findLarger(image)
    const largerDest = findLarger(dimensions)
    const smallerOrigDim = Math.min(image.width, image.height)
    const largerDestDim = Math.max(dimensions.width, dimensions.height)

    if (largerOrig === 'same' && largerDest === 'same') {
      return downscaleImage(image, dimensions.width / image.width) // width or height (doesn't matter)
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

const resizeByType = (type, image, dimensions) => {
  return new Promise((resolve, reject) => {
    switch (type) {
      case 'resizeToFill':
        resizeToFill(image, dimensions).then(resolve, reject)
        break
      case 'resizeProportionally':
        resizeProportionally(image, dimensions).then(resolve, reject)
        break
      default:
        reject('No resize type specified')
    }
  })
}

const resizeToFill = (image, dimensions) => {
  return new Promise((resolve, reject) => {
    const mask = {
      width: dimensions.width,
      height: dimensions.height
    }

    const dest = {}
    const scale = {
      x: mask.width / image.width,
      y: mask.height / image.height
    }

    if (scale.x >= scale.y) {
      dest.width = Math.ceil(scale.x * image.width)
      dest.height = Math.ceil(scale.x * image.height)
    } else {
      dest.width = Math.ceil(scale.y * image.width)
      dest.height = Math.ceil(scale.y * image.height)
    }

    const offset = {
      x: getCenterOffset(mask.width, dest.width),
      y: getCenterOffset(mask.height, dest.height)
    }

    createImage(image, offset, mask, dest).then(resolve, reject)
  })
}

const resizeProportionally = (image, dimensions) => {
  return new Promise((resolve, reject) => {
    const mask = {}

    if (dimensions.width) {
      mask.width = dimensions.width
      mask.height = image.height * dimensions.width / image.width
    } else {
      mask.width = image.width * dimensions.height / image.height
      mask.height = dimensions.height
    }

    createImage(image, {x: 0, y: 0}, mask, dimensions).then(resolve, reject)
  })
}

const createImage = (image, offset, mask, dest) => {
  return new Promise((resolve, reject) => {
    const canvas = createCanvas()
    const context = canvas.getContext('2d')

    canvas.width = mask.width
    canvas.height = mask.height

    const width = dest.width || mask.width
    const height = dest.height || mask.height

    context.drawImage(image, offset.x, offset.y, width, height)
    canvas.toBlob((blob) => {
      const imageObj = {
        blob,
        dimensions: {
          width: Math.floor(mask.width),
          height: Math.floor(mask.height)
        }
      }

      resolve(imageObj)
    })
  })
}

const getCenterOffset = (targetDimension, originDimension) => (
  Math.floor(getCenter(targetDimension) - getCenter(originDimension))
)

const getCenter = dimension => dimension / 2

const createCanvas = () => document.createElement('canvas')

export default resizeImage
