import { alertActions }  from '../../store/actions'

export const commons = {
  checkPassword,
}

/***************
  비밀번호 체크
***************/

function checkPassword(params) {
  return dispatch => {

    // 공백 체크
    if(params && params.search(/\s/) !== -1) {
      dispatch(alertActions.error({
        title: "비밀번호",
        message: "비밀번호는 공백없이 입력해주세요."
      }))
      return false
  	}

    // 길이 체크
    if(params && (params.length < 8 || params.length > 16)) {
      dispatch(alertActions.error({
        title: "비밀번호",
        message: "비밀번호는 최소 8자리부터 최대 16자리로 구성할 수 있습니다."
      }))
      return false
  	}

    // 연속 체크
    if(/(\w)\1\1\1/.test(params)) {
      dispatch(alertActions.error({
        title: "비밀번호",
        message: "같은 문자를 4번 이상 사용하실 수 없습니다."
      }))
  		return false
    }

    return true
  }
}
