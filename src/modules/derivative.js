import { saveAs } from 'file-saver'
import JSZip from 'jszip'

// ------------------------------------
// Constants
// ------------------------------------
export const DERIVATIVE_START = 'DERIVATIVE_START'
export const DERIVATIVE_STOP = 'DERIVATIVE_STOP'
export const DERIVATIVE_ADD = 'DERIVATIVE_ADD'
export const DERIVATIVE_DOWNLOAD_ALL = 'DERIVATIVE_DOWNLOAD_ALL'
export const DERIVATIVE_ENABLE_DOWNLOAD = 'DERIVATIVE_ENABLE_DOWNLOAD'

// ------------------------------------
// Actions
// ------------------------------------
export function actionStart () {
  return {
    type: DERIVATIVE_START,
    acting: true
  }
}

export function actionStop () {
  return {
    type: DERIVATIVE_STOP,
    acting: false
  }
}

export function addImage (image) {
  return {
    type: DERIVATIVE_ADD_IMAGE,
    payload: image
  }
}

export function add (derivative) {
  return {
    type: DERIVATIVE_ADD,
    payload: derivative
  }
}

export function process (derivative) {

}

export function enableDownload () {
  return {
    type: DERIVATIVE_ENABLE_DOWNLOAD
  }
}

export function downloadAll () {
  return {
    type: DERIVATIVE_DOWNLOAD_ALL
  }
}

export const actions = {
  add,
  process,
  enableDownload,
  downloadAll
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DERIVATIVE_ADD]: (state, action) => {
    if (state.images.filter((d) => d.id === action.payload.id).length > 0) {
      return state
    }

    return {...state, images: state.images.concat(action.payload)}
  },
  [DERIVATIVE_ENABLE_DOWNLOAD]: (state, action) => ({...state, downloadable: true}),
  [DERIVATIVE_DOWNLOAD_ALL]: (state, action) => {
    const zip = new JSZip()
    const folderName = `${state.images[0].originalName}-derivatives`
    const folder = zip.folder(folderName)

    state.images.forEach((d) => {
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
  images: [],
  downloadable: false
}

export default function derivativeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
