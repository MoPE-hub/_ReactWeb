import { columnsConstants } from '../constants'
import { alertActions } from './'
import { errorMessages } from '../messages'

export const columnsActions = {
  setColumn,
  setColumns,
  deleteColumns,
  setColumnComponent,
  setColumnsComponents
}

/*********
 항목 셋팅
**********/

function setColumn(params) {
  return async dispatch => {
    dispatch(request(params))
  }
  function request(params) {
    return {
      type: columnsConstants.SET_COLUMN_REQUEST,
      params
    }
  }
  function success(response) {
    return {
      type: columnsConstants.SET_COLUMN_SUCCESS,
      response
    }
  }
  function failure(error) {
    return {
      type: columnsConstants.SET_COLUMN_FAILURE,
      error
    }
  }
}

/*********
 엑셀 항목 셋팅
**********/

function setColumns(params) {
  return async dispatch => {
    dispatch(request(params))
  }
  function request(params) {
    return {
      type: columnsConstants.SET_COLUMNS_REQUEST,
      params
    }
  }
  function success(response) {
    return {
      type: columnsConstants.SET_COLUMNS_SUCCESS,
      response
    }
  }
  function failure(error) {
    return {
      type: columnsConstants.SET_COLUMNS_FAILURE,
      error
    }
  }
}

/*********
 항목 삭제
**********/

function deleteColumns(params) {
  return async dispatch => {
    dispatch(request(params))

    // 필요하다면 전송...
  }
  function request(params) {
    return {
      type: columnsConstants.DELETE_COLUMNS_REQUEST,
      params
    }
  }
  function success(response) {
    return {
      type: columnsConstants.DELETE__COLUMNS_SUCCESS,
      response
    }
  }
  function failure(error) {
    return {
      type: columnsConstants.DELETE_COLUMNS_FAILURE,
      error
    }
  }
}

/*********
 항목 컴포넌트
**********/

function setColumnComponent(params) {
  return async dispatch => {
    dispatch(request(params))
  }
  function request(params) {
    return {
      type: columnsConstants[params.type],
      params
    }
  }
  function success(response) {
    return {
      type: columnsConstants[params.type],
      response
    }
  }
  function failure(error) {
    return {
      type: columnsConstants[params.type],
      error
    }
  }
}

/*********
 컴포넌트
**********/

function setColumnsComponents(params) {
  return async dispatch => {
    dispatch(request(params))
  }
  function request(params) {
    return {
      type: columnsConstants.SET_COLUMNS_COMPONENTS_REQUEST,
      params
    }
  }
  function success(response) {
    return {
      type: columnsConstants.SET_COLUMNS_COMPONENTS_SUCCESS,
      response
    }
  }
  function failure(error) {
    return {
      type: columnsConstants.SET_COLUMNS_COMPONENTS_FAILURE,
      error
    }
  }
}
