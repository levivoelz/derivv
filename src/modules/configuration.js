// ------------------------------------
// Constants
// ------------------------------------
export const CONFIGURATION_ADD_DIMENSIONS = 'CONFIGURATION_ADD_DIMENSIONS'
export const CONFIGURATION_REMOVE_DIMENSIONS = 'CONFIGURATION_REMOVE_DIMENSIONS'
export const CONFIGURATION_UPDATE_DIMENSIONS = 'CONFIGURATION_UPDATE_DIMENSIONS'

// ------------------------------------
// Actions
// ------------------------------------
export function addDimensions () {
  return {
    type: CONFIGURATION_ADD_DIMENSIONS,
    payload: {width: '', height: ''}
  }
}

export function removeDimensions (dimensions) {
  return {
    type: CONFIGURATION_REMOVE_DIMENSIONS,
    payload: dimensions
  }
}

export function updateDimensions (dimensions) {
  return {
    type: CONFIGURATION_UPDATE_DIMENSIONS,
    payload: dimensions
  }
}

export const actions = {
  addDimensions,
  removeDimensions,
  updateDimensions
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CONFIGURATION_ADD_DIMENSIONS]: (state, action) => {
    const list = state.dimensionsList
    const nextId = list[list.length - 1].id + 1
    action.payload.id = nextId

    return {dimensionsList: state.dimensionsList.concat(action.payload)}
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
  }]
}

export default function configurationReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
