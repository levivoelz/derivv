import WebWorker from './WebWorker'
import downscaleWorker from './downscale.worker'

// snagged from: https://stackoverflow.com/questions/18922880/html5-canvas-resize-downscale-image-high-quality
// scales the image by (float) scale < 1
// returns a canvas containing the scaled image.
function downscaleImage(img, scale) {
  return new Promise((resolve, reject) => {
    if (!(scale < 1) || !(scale > 0)) {
      reject('scale must be a positive number < 1')
    }

    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const context = canvas.getContext('2d')

    context.drawImage(img, 0, 0)
    const imageData = context
      .getImageData(0, 0, canvas.width, canvas.height)
      .data;

    const data = {
      imageData,
      sourceWidth: canvas.width,
      sourceHeight: canvas.height,
      scale: normalizeScale(scale)
    }

    const worker = new WebWorker(downscaleWorker)
    worker.postMessage(data)

    worker.addEventListener('message', event => {
      resolve(createResultCanvas(event.data))
    })
  })
}

// normalize a scale <1 to avoid some rounding issue with js numbers
function normalizeScale(s) {
  s = 0 | (1 / s)
  let l = log2(s)
  let mask = 1 << l
  let accuracy = 4
  while (accuracy && l) {
    l--
    mask |= 1 << l
    accuracy--
  }
  return 1 / (s & mask)
}

function log2(v) {
  // taken from http://graphics.stanford.edu/~seander/bithacks.html
  let b = [0x2, 0xC, 0xF0, 0xFF00, 0xFFFF0000]
  let S = [1, 2, 4, 8, 16]
  let i = 0,
    r = 0

  for (i = 4; i >= 0; i--) {
    if (v & b[i]) {
      v >>= S[i]
      r |= S[i]
    }
  }
  return r
}

function createResultCanvas(target) {
  const canvas = document.createElement('canvas')
  canvas.width = target.width
  canvas.height = target.height
  const context = canvas.getContext('2d')
  const imageResult = context.getImageData(0, 0, target.width, target.height)
  const imageData = imageResult.data

  // convert float32 array into a UInt8Clamped Array
  for (let pixelIndex = 0, sourceIndex = 0, targetIndex = 0; pixelIndex < target.width * target.height; sourceIndex += 4, targetIndex += 4, pixelIndex++) {
    imageData[targetIndex] = Math.ceil(target.buffer[sourceIndex]);
    imageData[targetIndex + 1] = Math.ceil(target.buffer[sourceIndex + 1])
    imageData[targetIndex + 2] = Math.ceil(target.buffer[sourceIndex + 2])
    imageData[targetIndex + 3] = Math.ceil(target.buffer[sourceIndex + 3])
  }

  context.putImageData(imageResult, 0, 0)

  return canvas;
}

export default downscaleImage
