export const resizeImage = (src, dimensions, callback) => {
  const img = new Image()
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  img.src = src

  img.onload = function() {
    const destWidth = dimensions.width
    const destHeight = dimensions.height
    const srcWidth = img.width
    const srcHeight = img.height
    let width, height

    const scale_x = destWidth / srcWidth
    const scale_y = destHeight / srcHeight

    if (scale_x >= scale_y) {
      width = Math.ceil(scale_x * (srcWidth))
      height = Math.ceil(scale_x * (srcHeight))
    } else {
      width = Math.ceil(scale_y * (srcWidth))
      height = Math.ceil(scale_y * (srcHeight))
    }

    canvas.width = destWidth
    canvas.height = destHeight

    const canvasXCenter = canvas.width / 2
    const canvasYCenter = canvas.height / 2
    const imageXCenter = width / 2
    const imageYCenter = height / 2
    const xOffset = Math.floor((canvasXCenter - imageXCenter))
    const yOffset = Math.floor((canvasYCenter - imageYCenter))

    context.drawImage(img, xOffset, yOffset, width, height)
    canvas.toBlob((blob) => {
      callback(blob, canvas.toDataURL())
    })
  }
}

export default resizeImage
