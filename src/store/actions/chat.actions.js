import { chatConstants } from '../constants'
import { defaultService } from '../services'
import { alertActions } from './'
import { errorMessages } from '../messages'

export const chatActions = {
  send,
  receive,
  load,
  toggle,
  delete: _delete
}

function send(params) {
  return dispatch => {
    dispatch(request(params))

    defaultService.handleService(
      'post',
      '/swg/commmon/read/send.do',
      'testid=1'
    )
    .then(
      response => {
        dispatch(success(response))
      },
      error => {
        dispatch(failure(error))
        dispatch(alertActions.error({
          title: null,
          message: errorMessages.systemError
        }))
      }
    )
  }
  function request(params) {
    return {
      type: chatConstants.SEND_REQUEST,
      params
    }
  }
  function success(response) {
    return {
      type: chatConstants.SEND_SUCCESS,
      response
    }
  }
  function failure(response) {
    return {
      type: chatConstants.SEND_FAILURE,
      response
    }
  }
}

function receive() {
  return { type: chatConstants.RECEIVE_REQUEST }
}

function toggle(types) {
  return {
    type: chatConstants[types]
  }
}

function load() {
  return dispatch => {
    dispatch(request())

    defaultService.handleService(
      'post',
      '/swg/commmon/read/load.do',
      'testid=1'
    )
    .then(
      response => {
        dispatch(success(response))
      },
      error => {
        dispatch(failure(error))
        dispatch(alertActions.error({
          title: null,
          message: errorMessages.systemError
        }))
      }
    )
  }
  function request() {
    return {
      type: chatConstants.LOAD_REQUEST
    }
  }
  function success(response) {
    return {
      type: chatConstants.LOAD_SUCCESS,
      response
    }
  }
  function failure(error) {
    return {
      type: chatConstants.LOAD_FAILURE,
      error
    }
  }
}

function _delete(params) {
  return dispatch => {
    dispatch(request(params))

    console.log(params)
    defaultService.handleService(
      'post',
      '/swg/commmon/read/send.do',
      params
    )
    .then(
      response => {
        dispatch(success(response))
      },
      error => {
        dispatch(failure(error))
        dispatch(alertActions.error({
          title: null,
          message: errorMessages.systemError
        }))
      }
    )
  }
  function request(params) {
    return {
      type: chatConstants.DELETE_REQUEST,
      params
    }
  }
  function success(response) {
    return {
      type: chatConstants.DELETE_SUCCESS,
      response
    }
  }
  function failure(error) {
    return {
      type: chatConstants.DELETE_FAILURE,
      params
    }
  }
}
