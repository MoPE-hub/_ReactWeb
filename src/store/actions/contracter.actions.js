import { contracterConstants } from '../constants'
import { contracterService, defaultService } from '../services'
import { loaderActions, alertActions } from './'
import { errorMessages } from '../messages'

export const contracterActions = {
  regis,
  contracter,
  setContracter,
  toggleType,
  close,
  guideType,
  alert
}

/***********
 등록
************/

function regis(params) {
  return async dispatch => {
    dispatch(loaderActions.loading())
    dispatch(request())

    contracterService.regis(params)
    .then(
      response => {
        dispatch(loaderActions.loading())
        dispatch(success(response))

        dispatch(alertActions.confirm({
          title: '성공',
          message: '정상적으로 등록되었습니다. \n 등록화면으로 이동하시겠습니까?',
          params: {
            action: 'canvasActions',
            method: 'open',
            params: response.data.contract.cntrctNo
          }
        }))
      },
      error => {
        dispatch(loaderActions.loading())
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
      type: contracterConstants.CONTRACTER_REQUEST
    }
  }
  function success(response) {
    return {
      type: contracterConstants.CONTRACTER_SUCCESS,
      response
    }
  }
  function failure(response) {
    return {
      type: contracterConstants.CONTRACTER_FAILURE,
      response
    }
  }
}

/***********
 컨트랙터 오픈
************/

function contracter() {
  return async dispatch => {
    dispatch(request())
  }
  function request() {
    return {
      type: contracterConstants.CONTRACTER_REQUEST
    }
  }
}

/***********
 컨트랙터 셋팅
************/

function setContracter(params) {
  return async dispatch => {
    dispatch(request())

    defaultService.handleService(
      'post',
      '/swg/contract/read/getContractInfo.do',
      'cntrctNo=' + params.cntrctNo +
      '&menuId=101' +
      '&tmp='
    )
    .then(
      response => {
        dispatch(success())
        console.log(response)
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
      type: contracterConstants.CONTRACTER_REQUEST
    }
  }
  function success(response) {
    return {
      type: contracterConstants.CONTRACTER_SUCCESS,
      response
    }
  }
  function failure(response) {
    return {
      type: contracterConstants.CONTRACTER_FAILURE,
      response
    }
  }
}

/***********
 컨트랙터 닫기
************/

function close() {
  return async dispatch => {
    dispatch(toggle())
  }
  function toggle() {
    return {
      type: contracterConstants.CONTRACTER_CLOSE
    }
  }
}

/***********
 컨트랙터 타입
************/

function toggleType() {
  return async dispatch => {
    dispatch(toggle())
  }
  function toggle() {
    return {
      type: contracterConstants.CONTRACTER_TOGGLE_TYPE
    }
  }
}

/***********
 가이드 타입
************/

function guideType(guideType) {
  return async dispatch => {
    dispatch(request(guideType))
  }
  function request(guideType) {
    return {
      type: contracterConstants.CONTRACTER_GUIDE_TYPE,
      guideType
    }
  }
}

/***********
 경고창
************/

function alert(params) {
  console.log(params)
  return async dispatch => {
    dispatch(alertActions[params.type]({
      title: params.title,
      message: params.message
    }))
  }
}
