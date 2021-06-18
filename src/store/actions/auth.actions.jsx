import { authConstants } from '../constants'
import { authService, defaultService } from '../services'
// import history from '../../../route/history'
// import moment from "moment";

export const authActions = {
  logIn,
}

/**************
 로그인
 ***************/

function logIn(name, password) {
  return async dispatch => {
    dispatch(defaultService.apiAction(authConstants.LOGIN_REQUEST))

    authService.logIn(name, password)
      .then(
        response => {
          dispatch(defaultService.apiAction(authConstants.LOGIN_SUCCESS))
        },
        error => {
          dispatch(defaultService.apiAction(authConstants.LOGIN_FAILURE, error))
          // dispatch(defaultService.apiError(error))
        }
      )
  }
}
