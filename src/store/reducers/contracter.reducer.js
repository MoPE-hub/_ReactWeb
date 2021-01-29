import { contracterConstants } from '../constants'

export const initialState = {
  isOpen: false,
  isType: false,
  guideType: 'individual'
}

export default function contracter(state = initialState, action) {
  switch (action.type) {
    case contracterConstants.CONTRACTER_REQUEST:
      return {
        ...state,
        isOpen: !state.isOpen
      }
    case contracterConstants.CONTRACTER_SUCCESS:
      return {
        ...state,
        isType: !state.isType
      }
    case contracterConstants.CONTRACTER_TOGGLE_TYPE:
      return {
        ...state,
        isType: !state.isType
      }
    case contracterConstants.CONTRACTER_CLOSE:
      return {
        ...state,
        isOpen: !state.isOpen
      }
    case contracterConstants.CONTRACTER_GUIDE_TYPE:
      return {
        ...state,
        guideType: action.guideType
      }
    default:
      return state
  }
}
