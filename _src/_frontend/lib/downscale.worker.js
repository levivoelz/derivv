function worker() {
  self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
    if (!e) return;

    postMessage(createTargetData(e.data));
  })

  function createTargetData(sourceData) {
    const { imageData, sourceWidth, sourceHeight, scale } = sourceData;
    const source = {
      x: 0,
      y: 0,
      index: 0,
      width: sourceWidth,
      height: sourceHeight
    };

    let target = {
      x: 0,
      y: 0,
      index: 0,
      roundedX: 0,
      roundedY: 0,
      width: Math.floor(source.width * scale),
      height: Math.floor(source.height * scale),
    };

    target.buffer = new Float32Array(4 * target.width * target.height); // Float32 rgba

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

        const currentPixelChannels = getCurrentPixelChannels(source.index, imageData);

        if (!crossesX && !crossesY) { // pixel does not cross
          // just add components weighted by squared scale.
          target = updateTargetBuffer(target, target.index, currentPixelChannels, scale * scale)
        } else if (crossesX && !crossesY) { // cross on X only
          // add weighted component for current px
          weight = weightX * scale;
          target = updateTargetBuffer(target, target.index, currentPixelChannels, weight);

          // add weighted component for next (target.roundedX+1) px
          nextWeight = nextWeightX * scale
          target = updateTargetBuffer(target, target.index + 4, currentPixelChannels, nextWeight)
        } else if (crossesY && !crossesX) { // cross on Y only
          // add weighted component for current px
          weight = weightY * scale;
          target = updateTargetBuffer(target, target.index, currentPixelChannels, weight);

          // add weighted component for next (target.roundedY+1) px
          nextWeight = nextWeightY * scale
          target = updateTargetBuffer(target, target.index + 4 * target.width, currentPixelChannels, nextWeight);
        } else { // crosses both x and y : four target points involved
          // add weighted component for current px
          weight = weightX * weightY;
          target = updateTargetBuffer(target, target.index, currentPixelChannels, weight)

          // for target.roundedX + 1; target.roundedY px
          nextWeight = nextWeightX * weightY;
          target = updateTargetBuffer(target, target.index + 4, currentPixelChannels, nextWeight)

          // for target.roundedX ; target.roundedY + 1 px
          nextWeight = weightX * nextWeightY;
          target = updateTargetBuffer(target, target.index + (4 * target.width), currentPixelChannels, nextWeight);
          // for target.roundedX + 1 ; target.roundedY +1 px
          nextWeight = nextWeightX * nextWeightY;
          target = updateTargetBuffer(target, target.index + (4 * target.width) + 4, currentPixelChannels, nextWeight);
        }
      } // end for source.x
    } // end for source.y

    return target
  }


  function getCurrentPixelChannels(index, imageData) {
    const currentPixelChannels = {
      red: imageData[index],
      green: imageData[index + 1],
      blue: imageData[index + 2],
      alpha: imageData[index + 3],
    }

    return currentPixelChannels;
  }

  function updateTargetBuffer(target, index, currentPixelChannels, weight) {
    target.buffer[index] += currentPixelChannels.red * weight;
    target.buffer[index + 1] += currentPixelChannels.green * weight;
    target.buffer[index + 2] += currentPixelChannels.blue * weight;
    target.buffer[index + 3] += currentPixelChannels.alpha * weight;

    return target;
  }
}

export default worker
