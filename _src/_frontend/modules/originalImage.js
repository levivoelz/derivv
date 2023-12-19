import loadImage from 'blueimp-load-image'
import 'blueimp-canvas-to-blob'

// ------------------------------------
// Constants
// ------------------------------------
export const ORIGINAL_IMAGE_START = 'ORIGINAL_IMAGE_START'
export const ORIGINAL_IMAGE_STOP = 'ORIGINAL_IMAGE_STOP'
export const ORIGINAL_IMAGE_ADD = 'ORIGINAL_IMAGE_ADD'

// ------------------------------------
// Actions
// ------------------------------------
export function actionStart() {
  return {
    type: ORIGINAL_IMAGE_START,
    acting: true
  }
}

export function actionStop() {
  return {
    type: ORIGINAL_IMAGE_STOP,
    acting: false
  }
}

export function add(image) {
  return {
    type: ORIGINAL_IMAGE_ADD,
    payload: image
  }
}

export function addImage(image) {
  return (dispatch) => {
    dispatch(actionStart())

    // fix image orientation issues from iOS and retain exif data
    // Currently this takes anywhere from 500 ms to 1000 ms to process,
    // which is a huge bummer.
    loadImage.parseMetaData(
      image,
      (data) => {
        let orientation = 0
        if (typeof (data.exif) !== 'undefined') {
          image.exif = data.exif
          orientation = parseInt(data.exif.get('Orientation'), 10)
        }

        loadImage(
          image,
          (canvas) => {
            canvas.toBlob((blob) => {
              image.preview = URL.createObjectURL(blob)

              dispatch(add(image))
              dispatch(actionStop())
            })
          },
          { orientation, canvas: true }
        )
      }
    )
  }
}

export const actions = {
  addImage
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ORIGINAL_IMAGE_START]: (state, action) => {
    return {...state, acting: action.acting}
  },
  [ORIGINAL_IMAGE_STOP]: (state, action) => {
    return {...state, acting: action.acting}
  },
  [ORIGINAL_IMAGE_ADD]: (state, action) => {
    return {...state, file: action.payload}
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  file: {},
  acting: false
}

export default function fileReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
