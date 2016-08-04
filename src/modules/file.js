import { saveAs } from 'file-saver'
import JSZip from 'jszip'

// ------------------------------------
// Constants
// ------------------------------------
export const FILE_ADD_IMAGE = 'FILE_ADD_IMAGE'
export const FILE_DOWNLOAD_DERIVATIVES = 'FILE_DOWNLOAD_DERIVATIVES'
export const FILE_ADD_DERIVATIVE = 'FILE_ADD_DERIVATIVE'

// ------------------------------------
// Actions
// ------------------------------------
export function addImage (image) {
  return {
    type: FILE_ADD_IMAGE,
    payload: image
  }
}

export function addDerivative (derivative) {
  return {
    type: FILE_ADD_DERIVATIVE,
    payload: derivative
  }
}

export function downloadDerivatives () {
  return {
    type: FILE_DOWNLOAD_DERIVATIVES
  }
}

export const actions = {
  addImage,
  addDerivative,
  downloadDerivatives
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FILE_ADD_IMAGE]: (state, action) => {
    return {...state, image: action.payload[0]}
  },
  [FILE_ADD_DERIVATIVE]: (state, action) => {
    return {...state, derivatives: state.derivatives.concat(action.payload)}
  },
  [FILE_DOWNLOAD_DERIVATIVES]: (state, action) => {
    const zip = new JSZip();
    const folder = zip.folder('derivatives');

    state.derivatives.forEach((d) => {
      const fileName = `${d.name}.${d.extension}`
      folder.file(fileName, d.blob);
    })

    zip.generateAsync({type:"blob"})
      .then((content) => {
        saveAs(content, 'derivatives.zip')
      })

    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  image: {},
  derivatives: []
}

export default function fileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
