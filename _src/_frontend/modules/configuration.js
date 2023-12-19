import Papa from 'papaparse'
import { saveAs } from 'file-saver'

// ------------------------------------
// Constants
// ------------------------------------
export const CONFIGURATION_ADD_DIMENSIONS = 'CONFIGURATION_ADD_DIMENSIONS'
export const CONFIGURATION_REMOVE_DIMENSIONS = 'CONFIGURATION_REMOVE_DIMENSIONS'
export const CONFIGURATION_UPDATE_DIMENSIONS = 'CONFIGURATION_UPDATE_DIMENSIONS'
export const CONFIGURATION_ACTING_START = 'CONFIGURATION_ACTING_START'
export const CONFIGURATION_ACTING_END = 'CONFIGURATION_ACTING_END'

// ------------------------------------
// Actions
// ------------------------------------
function addDimensions(width='', height='') {
  return {
    type: CONFIGURATION_ADD_DIMENSIONS,
    payload: {width, height}
  }
}

function removeDimensions(dimensions) {
  return {
    type: CONFIGURATION_REMOVE_DIMENSIONS,
    payload: dimensions
  }
}

function updateDimensions(dimensions) {
  return {
    type: CONFIGURATION_UPDATE_DIMENSIONS,
    payload: dimensions
  }
}

function start() {
  return {
    type: CONFIGURATION_ACTING_START
  }
}

function end() {
  return {
    type: CONFIGURATION_ACTING_END
  }
}

export function exportCSV() {
  return (dispatch, getState) => {
    dispatch(start())

    const dimensions = [].concat(getState().configuration.dimensionsList)
    dimensions.forEach(d => {delete d.id})
    const csv = Papa.unparse(dimensions)
    const file = new Blob([csv])

    saveAs(file, `image-configurations.csv`)

    setTimeout(() => {
      dispatch(end())
    }, 500)
  }
}

export function importCSV(file) {
  return (dispatch, getState) => {
    dispatch(start())

    Papa.parse(file, {
      complete: (csv) => {
        const widthIndex = csv.data[0].indexOf('width')
        const heightIndex = csv.data[0].indexOf('height')

        csv.data.forEach((row, i) => {
          if (i !== 0) {
            dispatch(addDimensions(row[widthIndex], row[heightIndex]))
          }
        })
      }
    })

    setTimeout(() => {
      dispatch(end())
    }, 500)
  }
}

export const actions = {
  addDimensions,
  removeDimensions,
  updateDimensions,
  exportCSV,
  importCSV
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CONFIGURATION_ADD_DIMENSIONS]: (state, action) => {
    const list = state.dimensionsList
    const lastItem = list[list.length - 1] || {id: 1}

    if (lastItem.width === '' && lastItem.height === '') {
      if (state.acting) { // if importing
        return {
          dimensionsList: list.map((d) => {
            action.payload.id = lastItem.id + 1
            return d.id === lastItem.id ? action.payload : d
          })
        }
      } else {
        return state
      }
    }

    action.payload.id = lastItem.id + 1

    return {dimensionsList: list.concat(action.payload)}
  },
  [CONFIGURATION_REMOVE_DIMENSIONS]: (state, action) => {
    if (state.dimensionsList.length > 1) {
      return {dimensionsList: state.dimensionsList.filter((d) => (
        d.id !== action.payload
      ))}
    }

    return state
  },
  [CONFIGURATION_UPDATE_DIMENSIONS]: (state, action) => {
    const dimensionsList = state.dimensionsList.map((d) => (
      d.id === action.payload.id ? action.payload : d
    ))

    return {dimensionsList}
  },
  [CONFIGURATION_ACTING_START]: (state, action) => {
    return {...state, acting: true}
  },
  [CONFIGURATION_ACTING_END]: (state, action) => {
    return {...state, acting: false}
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  dimensionsList: [{
    id: 0,
    width: '',
    height: ''
  }],
  acting: false
}

export default function configurationReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
