import { alertConstants } from '../../constants'

export const alertActions = {
  success,
  error,
  clear,
  confirm
}

function success(params) {
  return {
    type: alertConstants.SUCCESS,
    params
  }
}

function error(params) {
  return {
    type: alertConstants.ERROR,
    params
  }
}

function clear() {
  return {
    type: alertConstants.CLEAR
  }
}

function confirm(params) {
  return async dispatch => {
    dispatch(request(params))

    function request(params) {
      return {
        type: alertConstants.CONFIRM,
        params
      }
    }
  }
}
