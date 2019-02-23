// snagged from: https://stackoverflow.com/questions/18922880/html5-canvas-resize-downscale-image-high-quality
// scales the image by (float) scale < 1
// returns a canvas containing the scaled image.
function downScaleImage(img, scale) {
  var imgCV = document.createElement('canvas')
  imgCV.width = img.width
  imgCV.height = img.height
  var imgCtx = imgCV.getContext('2d')
  imgCtx.drawImage(img, 0, 0)
  return downScaleCanvas(imgCV, scale)
}

// scales the canvas by (float) scale < 1
// returns a new canvas containing the scaled image.
function downScaleCanvas(sourceCanvas, scale) {
  if (!(scale < 1) || !(scale > 0)) throw new Error('scale must be a positive number <1 ')
  scale = normalizeScale(scale)
  var squareScale = scale * scale // square scale =  area of a source pixel within target
  var sourceWidth = sourceCanvas.width // source image width
  var sourceHeight = sourceCanvas.height // source image height
  var targetWidth = Math.ceil(sourceWidth * scale) // target image width
  var targetHeight = Math.ceil(sourceHeight * scale) // target image height
  var sourceX = 0,
    sourceY = 0,
    sIndex = 0 // source x,y, index within source array
  var targetX = 0,
    targetY = 0,
    yIndex = 0,
    tIndex = 0 // target x,y, x,y index within target array
  var roundedTargetX = 0,
    roundedTargetY = 0 // rounded targetX, targetY
  var weight = 0,
    nextWeight = 0,
    weightX = 0,
    nextWeightX = 0,
    weightY = 0,
    nextWeightY = 0 // weight / next weight x / y
  // weight is weight of current source point within target.
  // next weight is weight of current source point within next target's point.
  var crossX = false // does scaled px cross its current px right border ?
  var crossY = false // does scaled px cross its current px bottom border ?
  var sBuffer = sourceCanvas.getContext('2d')
    .getImageData(0, 0, sourceWidth, sourceHeight)
    .data // source buffer 8 bit rgba
  var targetBuffer = new Float32Array(4 * targetWidth * targetHeight) // target buffer Float32 rgb
  var sourceRed = 0,
    sourceGreen = 0,
    sourceBlue = 0, // source's current point r,g,b
    sourceAlpha = 0; //source alpha

  for (sourceY = 0; sourceY < sourceHeight; sourceY++) {
    targetY = sourceY * scale; // y src position within target
    roundedTargetY = 0 | targetY; // rounded : target pixel's y
    yIndex = 4 * roundedTargetY * targetWidth; // line index within target array
    crossY = (roundedTargetY !== (0 | targetY + scale));

    if (crossY) { // if pixel is crossing botton target pixel
      weightY = (roundedTargetY + 1 - targetY); // weight of point within target pixel
      nextWeightY = (targetY + scale - roundedTargetY - 1); // ... within y+1 target pixel
    }

    for (sourceX = 0; sourceX < sourceWidth; sourceX++, sIndex += 4) {
      targetX = sourceX * scale; // x src position within target
      roundedTargetX = 0 | targetX; // rounded : target pixel's x
      tIndex = yIndex + roundedTargetX * 4; // target pixel index within target array
      crossX = (roundedTargetX !== (0 | targetX + scale));
      if (crossX) { // if pixel is crossing target pixel's right
        weightX = (roundedTargetX + 1 - targetX); // weight of point within target pixel
        nextWeightX = (targetX + scale - roundedTargetX - 1); // ... within x+1 target pixel
      }
      sourceRed = sBuffer[sIndex]; // retrieving r,g,b for curr src px.
      sourceGreen = sBuffer[sIndex + 1];
      sourceBlue = sBuffer[sIndex + 2];
      sourceAlpha = sBuffer[sIndex + 3];

      if (!crossX && !crossY) { // pixel does not cross
        // just add components weighted by squared scale.
        targetBuffer[tIndex] += sourceRed * squareScale;
        targetBuffer[tIndex + 1] += sourceGreen * squareScale;
        targetBuffer[tIndex + 2] += sourceBlue * squareScale;
        targetBuffer[tIndex + 3] += sourceAlpha * squareScale;
      } else if (crossX && !crossY) { // cross on X only
        weight = weightX * scale;
        // add weighted component for current px
        targetBuffer[tIndex] += sourceRed * weight;
        targetBuffer[tIndex + 1] += sourceGreen * weight;
        targetBuffer[tIndex + 2] += sourceBlue * weight;
        targetBuffer[tIndex + 3] += sourceAlpha * weight;
        // add weighted component for next (roundedTargetX+1) px
        nextWeight = nextWeightX * scale
        targetBuffer[tIndex + 4] += sourceRed * nextWeight; // not 3
        targetBuffer[tIndex + 5] += sourceGreen * nextWeight; // not 4
        targetBuffer[tIndex + 6] += sourceBlue * nextWeight; // not 5
        targetBuffer[tIndex + 7] += sourceAlpha * nextWeight; // not 6
      } else if (crossY && !crossX) { // cross on Y only
        weight = weightY * scale;
        // add weighted component for current px
        targetBuffer[tIndex] += sourceRed * weight;
        targetBuffer[tIndex + 1] += sourceGreen * weight;
        targetBuffer[tIndex + 2] += sourceBlue * weight;
        targetBuffer[tIndex + 3] += sourceAlpha * weight;
        // add weighted component for next (roundedTargetY+1) px
        nextWeight = nextWeightY * scale
        targetBuffer[tIndex + 4 * targetWidth] += sourceRed * nextWeight; // *4, not 3
        targetBuffer[tIndex + 4 * targetWidth + 1] += sourceGreen * nextWeight; // *4, not 3
        targetBuffer[tIndex + 4 * targetWidth + 2] += sourceBlue * nextWeight; // *4, not 3
        targetBuffer[tIndex + 4 * targetWidth + 3] += sourceAlpha * nextWeight; // *4, not 3
      } else { // crosses both x and y : four target points involved
        // add weighted component for current px
        weight = weightX * weightY;
        targetBuffer[tIndex] += sourceRed * weight;
        targetBuffer[tIndex + 1] += sourceGreen * weight;
        targetBuffer[tIndex + 2] += sourceBlue * weight;
        targetBuffer[tIndex + 3] += sourceAlpha * weight;
        // for roundedTargetX + 1; roundedTargetY px
        nextWeight = nextWeightX * weightY;
        targetBuffer[tIndex + 4] += sourceRed * nextWeight; // same for x
        targetBuffer[tIndex + 5] += sourceGreen * nextWeight;
        targetBuffer[tIndex + 6] += sourceBlue * nextWeight;
        targetBuffer[tIndex + 7] += sourceAlpha * nextWeight;
        // for roundedTargetX ; roundedTargetY + 1 px
        nextWeight = weightX * nextWeightY;
        targetBuffer[tIndex + 4 * targetWidth] += sourceRed * nextWeight; // same for mul
        targetBuffer[tIndex + 4 * targetWidth + 1] += sourceGreen * nextWeight;
        targetBuffer[tIndex + 4 * targetWidth + 2] += sourceBlue * nextWeight;
        targetBuffer[tIndex + 4 * targetWidth + 3] += sourceAlpha * nextWeight;
        // for roundedTargetX + 1 ; roundedTargetY +1 px
        nextWeight = nextWeightX * nextWeightY;
        targetBuffer[tIndex + 4 * targetWidth + 4] += sourceRed * nextWeight; // same for both x and y
        targetBuffer[tIndex + 4 * targetWidth + 5] += sourceGreen * nextWeight;
        targetBuffer[tIndex + 4 * targetWidth + 6] += sourceBlue * nextWeight;
        targetBuffer[tIndex + 4 * targetWidth + 7] += sourceAlpha * nextWeight;
      }
    } // end for sourceX
  } // end for sourceY

  // create result canvas
  var resultCanvas = document.createElement('canvas')
  resultCanvas.width = targetWidth
  resultCanvas.height = targetHeight
  var resCtx = resultCanvas.getContext('2d')
  var imgRes = resCtx.getImageData(0, 0, targetWidth, targetHeight)
  var tByteBuffer = imgRes.data
  // convert float32 array into a UInt8Clamped Array
  var pxIndex = 0 //
  for (sIndex = 0, tIndex = 0; pxIndex < targetWidth * targetHeight; sIndex += 4, tIndex += 4, pxIndex++) {
    tByteBuffer[tIndex] = Math.ceil(targetBuffer[sIndex]);
    tByteBuffer[tIndex + 1] = Math.ceil(targetBuffer[sIndex + 1]);
    tByteBuffer[tIndex + 2] = Math.ceil(targetBuffer[sIndex + 2]);
    tByteBuffer[tIndex + 3] = Math.ceil(targetBuffer[sIndex + 3]);
  }
  // writing result to canvas.
  resCtx.putImageData(imgRes, 0, 0)
  return resultCanvas
}

function log2(v) {
  // taken from http://graphics.stanford.edu/~seander/bithacks.html
  var b = [0x2, 0xC, 0xF0, 0xFF00, 0xFFFF0000]
  var S = [1, 2, 4, 8, 16]
  var i = 0,
    r = 0

  for (i = 4; i >= 0; i--) {
    if (v & b[i]) {
      v >>= S[i]
      r |= S[i]
    }
  }
  return r
}
// normalize a scale <1 to avoid some rounding issue with js numbers
function normalizeScale(s) {
  if (s > 1) throw new Error('s must be <1')
  s = 0 | (1 / s)
  var l = log2(s)
  var mask = 1 << l
  var accuracy = 4
  while (accuracy && l) {
    l--
    mask |= 1 << l
    accuracy--
  }
  return 1 / (s & mask)
}

export default downScaleImage
