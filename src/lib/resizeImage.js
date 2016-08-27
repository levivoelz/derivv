import { resizeCanvas } from 'pica'

const resizeImage = (src, dimensions, type) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = src

    image.onload = () => {
      if (image.width - dimensions.width > dimensions.width * 1.2) {
        downsizeImage(image, dimensions.width * 1.1).then((canvas) => {
          resizeByType(type, canvas, dimensions).then(resolve)
        })
      } else {
        resizeByType(type, image, dimensions).then(resolve)
      }
    }
  })
}

const resizeByType = (type, image, dimensions) => {
  return new Promise((resolve, reject) => {
    if (type === 'resizeToFill') {
      resizeToFill(image, dimensions).then(resolve)
    } else if (type === 'resizeProportionally') {
      resizeProportionally(image, dimensions).then(resolve)
    } else {
      throw new Error('No resize type specified')
    }
  })
}

const resizeToFill = (image, dimensions) => {
  return new Promise((resolve, reject) => {
    const mask = {
      width: dimensions.width,
      height: dimensions.height
    }

    const dest = {
      width: null,
      height: null
    }

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

    createImage(image, offset, mask, dest).then(resolve)
  })
}

const resizeProportionally = (image, dimensions) => {
  return new Promise((resolve, reject) => {
    const mask = {
      width: null,
      height: null
    }

    if (dimensions.width) {
      mask.width = dimensions.width
      mask.height = image.height * dimensions.width / image.width
    } else {
      mask.width = image.width * dimensions.height / image.height
      mask.height = dimensions.height
    }

    createImage(image, {x: 0, y: 0}, mask, dimensions).then(resolve)
  })
}

const downsizeImage = (image, width) => {
  return new Promise((resolve, reject) => {
    const canvas = createCanvas()

    canvas.width = width
    canvas.height = image.height * width / image.width

    resizeCanvas(image, canvas, {}, (err) => {
      err && reject(err)

      resolve(canvas)
    })
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
      const results = {
        blob,
        dimensions: {width: mask.width, height: mask.height}
      }

      resolve(results)
    })
  })
}

const getCenterOffset = (targetDimension, originDimension) => (
  Math.floor(getCenter(targetDimension) - getCenter(originDimension))
)

const getCenter = (dimension) => dimension / 2

const createCanvas = () => document.createElement('canvas')

export default resizeImage
