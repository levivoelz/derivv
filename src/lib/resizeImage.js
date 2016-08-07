export const resizeImage = (src, dimensions, callback) => {
  const img = new Image()
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  img.src = src

  img.onload = function () {
    const destWidth = dimensions.width
    const destHeight = dimensions.height
    const srcWidth = img.width
    const srcHeight = img.height
    let width, height

    const scaleX = destWidth / srcWidth
    const scaleY = destHeight / srcHeight

    if (scaleX >= scaleY) {
      width = Math.ceil(scaleX * (srcWidth))
      height = Math.ceil(scaleX * (srcHeight))
    } else {
      width = Math.ceil(scaleY * (srcWidth))
      height = Math.ceil(scaleY * (srcHeight))
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
    canvas.toBlob((blob) => { callback(blob) })
  }
}

export default resizeImage
