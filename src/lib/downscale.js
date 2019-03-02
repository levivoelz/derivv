// snagged from: https://stackoverflow.com/questions/18922880/html5-canvas-resize-downscale-image-high-quality
// scales the image by (float) scale < 1
// returns a canvas containing the scaled image.
function downScaleImage(img, scale) {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const context = canvas.getContext('2d')

  context.drawImage(img, 0, 0)

  return downScaleCanvas(canvas, scale)
}

// scales the canvas by (float) scale < 1
// returns a new canvas containing the scaled image.
function downScaleCanvas(canvas, scale) {
  if (!(scale < 1) || !(scale > 0)) {
    throw new Error('scale must be a positive number < 1')
  }

  scale = normalizeScale(scale)

  const source = {
    x: 0,
    y: 0,
    index: 0,
    width: canvas.width,
    height: canvas.height
  };

  source.buffer = canvas.getContext('2d')
    .getImageData(0, 0, source.width, source.height)
    .data;

  let target = {
    x: 0,
    y: 0,
    index: 0,
    roundedX: 0,
    roundedY: 0,
    width: Math.ceil(source.width * scale),
    height: Math.ceil(source.height * scale),
  };

  target.buffer = new Float32Array(4 * target.width * target.height); // Float32 rgba

  const currentPixel = {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 0
  }

  let yIndex = 0;

  let weight = 0,
    nextWeight = 0,
    weightX = 0,
    nextWeightX = 0,
    weightY = 0, // weight is weight of current source point within target.
    nextWeightY = 0 // next weight is weight of current source point within next target's point.

  let crossesX = false // does scaled px cross its current px right border ?
  let crossesY = false // does scaled px cross its current px bottom border ?

  for (source.y = 0; source.y < source.height; source.y++) {
    target.y = source.y * scale; // y src position within target
    target.roundedY = 0 | target.y; // rounded : target pixel's y
    yIndex = 4 * target.roundedY * target.width; // line index within target array
    crossesY = (target.roundedY !== (0 | target.y + scale));

    if (crossesY) { // if pixel is crossing botton target pixel
      weightY = (target.roundedY + 1 - target.y); // weight of point within target pixel
      nextWeightY = (target.y + scale - target.roundedY - 1); // ... within y+1 target pixel
    }

    for (source.x = 0; source.x < source.width; source.x++, source.index += 4) {
      target.x = source.x * scale; // x src position within target
      target.roundedX = 0 | target.x; // rounded : target pixel's x
      target.index = yIndex + target.roundedX * 4; // target pixel index within target array
      crossesX = (target.roundedX !== (0 | target.x + scale));

      if (crossesX) { // if pixel is crossing target pixel's right
        weightX = (target.roundedX + 1 - target.x); // weight of point within target pixel
        nextWeightX = (target.x + scale - target.roundedX - 1); // ... within x+1 target pixel
      }

      currentPixel.red = source.buffer[source.index]; // retrieving r,g,b for curr src px.
      currentPixel.green = source.buffer[source.index + 1];
      currentPixel.blue = source.buffer[source.index + 2];
      currentPixel.alpha = source.buffer[source.index + 3];

      if (!crossesX && !crossesY) { // pixel does not cross
        // just add components weighted by squared scale.
        target = updateBuffer(target, target.index, currentPixel, scale * scale)
      } else if (crossesX && !crossesY) { // cross on X only
        // add weighted component for current px
        weight = weightX * scale;
        target = updateBuffer(target, target.index, currentPixel, weight);

        // add weighted component for next (target.roundedX+1) px
        nextWeight = nextWeightX * scale
        target = updateBuffer(target, target.index + 4, currentPixel, nextWeight)
      } else if (crossesY && !crossesX) { // cross on Y only
        // add weighted component for current px
        weight = weightY * scale;
        target = updateBuffer(target, target.index, currentPixel, weight);

        // add weighted component for next (target.roundedY+1) px
        nextWeight = nextWeightY * scale
        target = updateBuffer(target, target.index + 4 * target.width, currentPixel, nextWeight);
      } else { // crosses both x and y : four target points involved
        // add weighted component for current px
        weight = weightX * weightY;
        target = updateBuffer(target, target.index, currentPixel, weight)

        // for target.roundedX + 1; target.roundedY px
        nextWeight = nextWeightX * weightY;
        target = updateBuffer(target, target.index + 4, currentPixel, nextWeight)

        // for target.roundedX ; target.roundedY + 1 px
        nextWeight = weightX * nextWeightY;
        target = updateBuffer(target, target.index + (4 * target.width), currentPixel, nextWeight);
        // for target.roundedX + 1 ; target.roundedY +1 px
        nextWeight = nextWeightX * nextWeightY;
        target = updateBuffer(target, target.index + (4 * target.width) + 4, currentPixel, nextWeight);
      }
    } // end for source.x
  } // end for source.y

  return createResultCanvas(target)
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

function updateBuffer(target, index, currentPixel, weight) {
  target.buffer[index] += currentPixel.red * weight;
  target.buffer[index + 1] += currentPixel.green * weight;
  target.buffer[index + 2] += currentPixel.blue * weight;
  target.buffer[index + 3] += currentPixel.alpha * weight;

  return target;
}

function createResultCanvas(target) {
  const canvas = document.createElement('canvas')
  canvas.width = target.width
  canvas.height = target.height
  const context = canvas.getContext('2d')

  const imageResult = context.getImageData(0, 0, target.width, target.height)
  const targetByteBuffer = imageResult.data

  // convert float32 array into a UInt8Clamped Array
  for (let pixelIndex = 0, sourceIndex = 0, targetIndex = 0; pixelIndex < target.width * target.height; sourceIndex += 4, targetIndex += 4, pixelIndex++) {
    targetByteBuffer[targetIndex] = Math.ceil(target.buffer[sourceIndex]);
    targetByteBuffer[targetIndex + 1] = Math.ceil(target.buffer[sourceIndex + 1]);
    targetByteBuffer[targetIndex + 2] = Math.ceil(target.buffer[sourceIndex + 2]);
    targetByteBuffer[targetIndex + 3] = Math.ceil(target.buffer[sourceIndex + 3]);
  }

  context.putImageData(imageResult, 0, 0)

  return canvas;
}

export default downScaleImage
