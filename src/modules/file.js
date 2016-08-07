import { saveAs } from 'file-saver'
import JSZip from 'jszip'

// ------------------------------------
// Constants
// ------------------------------------
export const FILE_ADD_IMAGE = 'FILE_ADD_IMAGE'
export const FILE_DOWNLOAD_DERIVATIVES = 'FILE_DOWNLOAD_DERIVATIVES'
export const FILE_ENABLE_DOWNLOAD = 'FILE_ENABLE_DOWNLOAD'
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

export function enableDownload () {
  return {
    type: FILE_ENABLE_DOWNLOAD
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
  enableDownload,
  downloadDerivatives
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FILE_ADD_IMAGE]: (state, action) => {
    return {...state, image: action.payload[0], derivatives: []}
  },
  [FILE_ADD_DERIVATIVE]: (state, action) => {
    if (state.derivatives.filter((d) => d.id === action.payload.id).length > 0) {
      return state
    }

    return {...state, derivatives: state.derivatives.concat(action.payload)}
  },
  [FILE_ENABLE_DOWNLOAD]: (state, action) => ({...state, downloadable: true}),
  [FILE_DOWNLOAD_DERIVATIVES]: (state, action) => {
    const zip = new JSZip()
    const folderName = `${state.derivatives[0].originalName}-derivatives`
    const folder = zip.folder(folderName)

    state.derivatives.forEach((d) => {
      const fileName = `${d.name}.${d.extension}`
      folder.file(fileName, d.blob)
    })

    zip.generateAsync({type: 'blob'})
      .then((content) => {
        saveAs(content, `${folderName}.zip`)
      })

    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  image: {},
  derivatives: [],
  downloadable: false
}

export default function fileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
