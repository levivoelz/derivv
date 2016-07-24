// ------------------------------------
// Constants
// ------------------------------------
export const FILE_ADD_IMAGE = 'FILE_ADD_IMAGE'

// ------------------------------------
// Actions
// ------------------------------------
export function addImage (image) {
  return {
    type: FILE_ADD_IMAGE,
    payload: image
  }
}

export const actions = {
  addImage
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FILE_ADD_IMAGE]: (state, action) => {
    return {...state, image: action.payload[0]}
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  image: {}
}

export default function fileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
