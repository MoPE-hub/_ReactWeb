import { controllerConstants } from '../constants'

export const initialState = {
  viewType: 'COMPOSE', //COMPOSE, PREVIEW, COMPLETE, SIGNER
  isThumbnailOpen: true
}

export default function controller(state = initialState, action) {
  switch (action.type) {

    case controllerConstants.CONTROLLER_ZOOM_IN_REQUEST:
      return {
        ...state,
        currentScale: action.params
      }
    case controllerConstants.CONTROLLER_ZOOM_IN_SUCCESS:
      return {
        ...state
      }
    case controllerConstants.CONTROLLER_ZOOM_IN_FAILURE:
      return {
        ...state,
      }

    case controllerConstants.CONTROLLER_ZOOM_OUT_REQUEST:
      return {
        ...state,
        currentScale: action.params
      }
    case controllerConstants.CONTROLLER_ZOOM_OUT_SUCCESS:
      return {
        ...state
      }
    case controllerConstants.CONTROLLER_ZOOM_OUT_FAILURE:
      return {
        ...state,
      }

      case controllerConstants.CONTROLLER_SET_SCALE_REQUEST:
        return {
          ...state,
          currentScale: action.params
        }
      case controllerConstants.CONTROLLER_SET_SCALE_SUCCESS:
        return {
          ...state
        }
      case controllerConstants.CONTROLLER_SET_SCALE_FAILURE:
        return {
          ...state,
        }

    case controllerConstants.CONTROLLER_SET_VIEW_TYPE_REQUEST:
      return {
        ...state,
        viewType: action.params
      }
    case controllerConstants.CONTROLLER_SET_VIEW_TYPE_SUCCESS:
      return {
        ...state
      }
    case controllerConstants.CONTROLLER_SET_VIEW_TYPE_FAILURE:
      return {
        ...state,
      }

    case controllerConstants.CONTROLLER_TOGGLE_THUMBNAIL_REQUEST:
      return {
        ...state,
        isThumbnailOpen: !state.isThumbnailOpen
      }
    case controllerConstants.CONTROLLER_TOGGLE_THUMBNAIL_SUCCESS:
      return {
        ...state
      }
    case controllerConstants.CONTROLLER_TOGGLE_THUMBNAIL_FAILURE:
      return {
        ...state,
      }

    default:
      return state
  }
}
