import { commonConstants } from '../constants'

const initialState = {
  isOpen: false
}

export default function common(state = initialState, action) {
  switch (action.type) {
    case commonConstants.NAVIGATION_OPEN:
      return {
        ...state,
        isOpen: !state.isOpen
      }
    default:
      return state
  }
}

