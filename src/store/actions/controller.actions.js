import { controllerConstants } from '../constants'

export const controllerActions = {
  zoomIn,
  zoomOut,
  setScale,
  setViewType,
  toggleThumbnail
}

function zoomIn(params) {
  return async dispatch => {
    dispatch(request(params))
  }
  function request(params) {
    return {
      type: controllerConstants.CONTROLLER_ZOOM_IN_REQUEST,
      params
    }
  }
}

function zoomOut(params) {
  return async dispatch => {
    dispatch(request(params))
  }
  function request(params) {
    return {
      type: controllerConstants.CONTROLLER_ZOOM_OUT_REQUEST,
      params
    }
  }
}

function setScale(params) {
  return async dispatch => {
    dispatch(request(params))
  }
  function request(params) {
    return {
      type: controllerConstants.CONTROLLER_SET_SCALE_REQUEST,
      params
    }
  }
}

function setViewType(params) {
  return async dispatch => {
    dispatch(request(params))
  }
  function request(params) {
    return {
      type: controllerConstants.CONTROLLER_SET_VIEW_TYPE_REQUEST,
      params
    }
  }
}

function toggleThumbnail() {
  return async dispatch => {
    dispatch(request())
  }
  function request() {
    return {
      type: controllerConstants.CONTROLLER_TOGGLE_THUMBNAIL_REQUEST
    }
  }
}
