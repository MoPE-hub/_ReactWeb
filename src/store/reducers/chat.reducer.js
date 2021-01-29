import { chatConstants } from '../constants'

export const initialState = {
  isOpen: false,
  isLoading: false,
  message: null
}

export default function chat(state = initialState, action) {
  switch (action.type) {
    case chatConstants.TOGGLE_POPUP:
      return {
        ...state,
        isOpen: !state.isOpen
      }
    case chatConstants.LOAD_REQUEST:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    case chatConstants.LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.response.data
      }
    case chatConstants.LOAD_FAILURE:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
