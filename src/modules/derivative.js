import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import resizeImage from 'lib/resizeImage'

// ------------------------------------
// Constants
// ------------------------------------
export const DERIVATIVE_START = 'DERIVATIVE_START'
export const DERIVATIVE_STOP = 'DERIVATIVE_STOP'
export const DERIVATIVE_ADD = 'DERIVATIVE_ADD'
export const DERIVATIVE_UPDATE = 'DERIVATIVE_UPDATE'
export const DERIVATIVE_CLEAR_ALL = 'DERIVATIVE_CLEAR_ALL'
export const DERIVATIVE_DOWNLOAD_ALL = 'DERIVATIVE_DOWNLOAD_ALL'
export const DERIVATIVE_ENABLE_DOWNLOAD = 'DERIVATIVE_ENABLE_DOWNLOAD'
export const DERIVATIVE_DISABLE_DOWNLOAD = 'DERIVATIVE_DISABLE_DOWNLOAD'

// ------------------------------------
// Actions
// ------------------------------------
export function start() {
  return {
    type: DERIVATIVE_START,
    acting: true
  }
}

export function stop() {
  return {
    type: DERIVATIVE_STOP,
    acting: false
  }
}

export function add(derivative) {
  return {
    type: DERIVATIVE_ADD,
    payload: derivative
  }
}

export function update(derivative) {
  return {
    type: DERIVATIVE_UPDATE,
    payload: derivative
  }
}

export function clearAll() {
  return {
    type: DERIVATIVE_CLEAR_ALL
  }
}

export function enableDownload() {
  return {
    type: DERIVATIVE_ENABLE_DOWNLOAD
  }
}

export function disableDownload() {
  return {
    type: DERIVATIVE_DISABLE_DOWNLOAD
  }
}

export function downloadAll() {
  return {
    type: DERIVATIVE_DOWNLOAD_ALL
  }
}

export function processAll(image, configs) {
  return (dispatch) => {
    dispatch(start())
    dispatch(clearAll())

    configs.forEach((config) => {
      _resize(image, config)
        .then((derivativeImage) => {
          dispatch(add(derivativeImage))

          if (config.id === configs[configs.length - 1].id) { // last item
            dispatch(stop())
            dispatch(enableDownload())
          }
        })
    })
  }
}

export function processOne(image, config) {
  return (dispatch) => {
    dispatch(start())
    dispatch(disableDownload())
    _resize(image, config)
      .then((derivativeImage) => {
        dispatch(update(derivativeImage))
        dispatch(stop())
        dispatch(enableDownload())
      })
  }
}

const _resize = (image, config) => {
  config = _buildConfig(image, config)

  return resizeImage(image.preview, config)
    .then(({blob, width, height}) => {
      const expandedFileName = _expandFileName(image.name)

      return {
        originalName: expandedFileName.name,
        id: config.id,
        src: URL.createObjectURL(blob),
        blob,
        name: `${expandedFileName.name}-${width}_x_${height}`,
        extension: expandedFileName.extension,
        width,
        height
      }
    })
}

const _expandFileName = (fileName) => {
  const arr = fileName.split('.')

  return {
    extension: arr.slice(arr.length - 1).join(),
    name: arr.slice(0, -1).join()
  }
}

const _buildConfig = (image, c) => {
  const config = Object.assign({}, c)
  config.resizeType = _resizeType(config)
  config.type = image.type
  return config
}

const _resizeType = (config) => {
  if (config.resizeType) {
    return config.resizeType
  }

  return config.width && config.height
      ? 'resizeToFill'
      : 'resizeProportionally'
}

export const actions = {
  add,
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
  [DERIVATIVE_UPDATE]: (state, action) => {
    const images = state.images.map((d) => {
      return d.id === action.payload.id
        ? action.payload
        : d
    })

    return {...state, images}
  },
  [DERIVATIVE_CLEAR_ALL]: (state, action) => {
    return {...state, images: []}
  },
  [DERIVATIVE_ENABLE_DOWNLOAD]: (state, action) => ({...state, downloadable: true}),
  [DERIVATIVE_ENABLE_DOWNLOAD]: (state, action) => ({...state, downloadable: false}),
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
  acting: false,
  downloadable: false
}

export default function derivativeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
