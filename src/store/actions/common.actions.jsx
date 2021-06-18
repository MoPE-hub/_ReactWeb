import { commonConstants } from '../constants'
import { defaultService } from '../services'

export const commonActions = {
  navOpen,
}

function navOpen() {
  return async dispatch => {
    dispatch(defaultService.Action(commonConstants.NAVIGATION_OPEN))
  }
}
