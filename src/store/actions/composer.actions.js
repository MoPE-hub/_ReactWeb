import { composerConstants } from '../constants'
import { defaultService } from '../services'
import { alertActions } from './'
import { errorMessages } from '../messages'
import parser from '../../module/json-mapper'

export const composerActions = {
  setRequester,
  deleteRequester,
  setUser,
  setUsers,
  setExtension,
  setExtensions,
  deleteUser,
  setComponent,
  deleteComponent,
  setComponents,
  send
}

function setRequester(params) {
  return async dispatch => {
    dispatch(request(params))
  }
  function request(params) {
    return {
      type: composerConstants.SET_REQUESTER_REQUEST,
      params
    }
  }
  function success(response) {
    return {
      type: composerConstants.SET_REQUESTER_SUCCESS,
      response
    }
  }
  function failure(error) {
    return {
      type: composerConstants.SET_REQUESTER_FAILURE,
      error
    }
  }
}

function deleteRequester(params) {
  return async dispatch => {
    dispatch(request(params))

    // 필요하다면 전송...
  }
  function request(params) {
    return {
      type: composerConstants.DELETE_REQUESTER_REQUEST,
      params
    }
  }
  function success(response) {
    return {
      type: composerConstants.DELETE_REQUESTER_SUCCESS,
      response
    }
  }
  function failure(error) {
    return {
      type: composerConstants.DELETE_REQUESTER_FAILURE,
      error
    }
  }
}

function setUser(params) {
  return async dispatch => {
    dispatch(request(params))
  }
  function request(params) {
    return {
      type: composerConstants.SET_USER_REQUEST,
      params
    }
  }
  function success(response) {
    return {
      type: composerConstants.SET_USER_SUCCESS,
      response
    }
  }
  function failure(error) {
    return {
      type: composerConstants.SET_USER_FAILURE,
      error
    }
  }
}

function setUsers(params) {
  return async dispatch => {
    dispatch(request(params))
  }
  function request(params) {
    return {
      type: composerConstants.SET_USERS_REQUEST,
      params
    }
  }
  function success(response) {
    return {
      type: composerConstants.SET_USERS_SUCCESS,
      response
    }
  }
  function failure(error) {
    return {
      type: composerConstants.SET_USERS_FAILURE,
      error
    }
  }
}

function setExtension(params) {
  return async dispatch => {
    dispatch(request(params))
  }
  function request(params) {
    return {
      type: composerConstants.SET_EXTENSION_REQUEST,
      params
    }
  }
  function success(response) {
    return {
      type: composerConstants.SET_EXTENSION_SUCCESS,
      response
    }
  }
  function failure(error) {
    return {
      type: composerConstants.SET_EXTENSION_FAILURE,
      error
    }
  }
}

function setExtensions(params) {
  return async dispatch => {
    dispatch(request(params))
  }
  function request(params) {
    return {
      type: composerConstants.SET_EXTENSIONS_REQUEST,
      params
    }
  }
  function success(response) {
    return {
      type: composerConstants.SET_EXTENSIONS_SUCCESS,
      response
    }
  }
  function failure(error) {
    return {
      type: composerConstants.SET_EXTENSIONS_FAILURE,
      error
    }
  }
}

function deleteUser(params) {
  return async dispatch => {
    dispatch(request(params))

    // 필요하다면 전송...
  }
  function request(params) {
    return {
      type: composerConstants.DELETE_USER_REQUEST,
      params
    }
  }
  function success(response) {
    return {
      type: composerConstants.DELETE_USER_SUCCESS,
      response
    }
  }
  function failure(error) {
    return {
      type: composerConstants.DELETE_USER_FAILURE,
      error
    }
  }
}

function setComponent(params) {
  return async dispatch => {
    dispatch(request(params))
  }
  function request(params) {
    return {
      type: composerConstants[params.type],
      params
    }
  }
  function success(response) {
    return {
      type: composerConstants[params.type],
      response
    }
  }
  function failure(error) {
    return {
      type: composerConstants[params.type],
      error
    }
  }
}

function deleteComponent(params) {
  return async dispatch => {
    dispatch(request(params))
  }
  function request(params) {
    return {
      type: composerConstants[params.type],
      params
    }
  }
  function success(response) {
    return {
      type: composerConstants[params.type],
      response
    }
  }
  function failure(error) {
    return {
      type: composerConstants[params.type],
      error
    }
  }
}

function setComponents(params) {
  return async dispatch => {
    dispatch(request(params))
  }
  function request(params) {
    return {
      type: composerConstants.SET_COMPONENTS_REQUEST,
      params
    }
  }
  function success(response) {
    return {
      type: composerConstants.SET_COMPONENTS_SUCCESS,
      response
    }
  }
  function failure(error) {
    return {
      type: composerConstants.SET_COMPONENTS_FAILURE,
      error
    }
  }
}

function send(params) {
  return async dispatch => {
    // dispatch(request(params))
    // console.log(params)
    // const outBouds = parser('outBouds', params.data)

    defaultService.handleService(
      'post',
      '/api/v1/user/signup',
      {
        "email": "78minu11@naver.com",
        "firstName": "park1",
        "lastName": "minu1",
        "mobileNumber": "010864644446",
        "password": "a73059769"
      }
      // outBouds
    )
    .then(
      response => {
        dispatch(success(response))
      },
      error => {
        dispatch(failure(error))
        console.log(error)
        dispatch(alertActions.error({
          title: null,
          message: errorMessages.systemError
        }))
      }
    )
  }
  function request(params) {
    return {
      type: composerConstants.SEND_REQUEST,
      params
    }
  }
  function success(response) {
    return {
      type: composerConstants.SEND_SUCCESS,
      response
    }
  }
  function failure(error) {
    return {
      type: composerConstants.SEND_FAILURE,
      error
    }
  }
}
