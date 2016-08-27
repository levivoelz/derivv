import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import resizeImage from 'lib/resizeImage'

// ------------------------------------
// Constants
// ------------------------------------
export const DERIVATIVE_START = 'DERIVATIVE_START'
export const DERIVATIVE_STOP = 'DERIVATIVE_STOP'
export const DERIVATIVE_ADD = 'DERIVATIVE_ADD'
export const DERIVATIVE_CLEAR_ALL = 'DERIVATIVE_CLEAR_ALL'
export const DERIVATIVE_DOWNLOAD_ALL = 'DERIVATIVE_DOWNLOAD_ALL'
export const DERIVATIVE_ENABLE_DOWNLOAD = 'DERIVATIVE_ENABLE_DOWNLOAD'

// ------------------------------------
// Actions
// ------------------------------------
export function start () {
  return {
    type: DERIVATIVE_START,
    acting: true
  }
}

export function stop () {
  return {
    type: DERIVATIVE_STOP,
    acting: false
  }
}

export function add (derivative) {
  return {
    type: DERIVATIVE_ADD,
    payload: derivative
  }
}

export function processAll (configs, image) {
  return (dispatch) => {
    dispatch(start())
    const imageNameArr = image.name.split('.')
    const extension = imageNameArr.splice(imageNameArr.length - 1, 1).join()
    const imageName = imageNameArr.join()

    configs.forEach((config) => {
      config.dimensions = {width: config.width, height: config.height}
      config.resizeType = 'resizeToFill'

      process(config, image).then((blob) => {
        const width = config.width
        const height = config.height
        const name = `${imageName}_${width}_x_${height}`
        const newImage = {
          originalName: imageName,
          id: config.id,
          src: URL.createObjectURL(blob),
          width,
          height,
          blob,
          name,
          extension
        }

        dispatch(add(newImage))
        config.id === configs[configs.length - 1].id && dispatch(stop())
      })
    })

    return Promise.resolve()
  }
}

export function process (config, image) {
  return new Promise((resolve, reject) => {
    resizeImage(image.preview, config.dimensions, config.resizeType).then(resolve)
  })
}

export function clearAll () {
  return {
    type: DERIVATIVE_CLEAR_ALL
  }
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
  clearAll,
  enableDownload,
  downloadAll
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DERIVATIVE_START]: (state, action) => {
    return {...state, acting: action.acting}
  },
  [DERIVATIVE_STOP]: (state, action) => {
    return {...state, acting: action.acting}
  },
  [DERIVATIVE_ADD]: (state, action) => {
    if (state.images.filter((d) => d.id === action.payload.id).length > 0) {
      return state
    }

    return {...state, images: state.images.concat(action.payload)}
  },
  [DERIVATIVE_CLEAR_ALL]: (state, action) => {
    return {...state, images: []}
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
