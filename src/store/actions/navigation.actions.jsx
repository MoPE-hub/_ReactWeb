import {navigationConstants} from '../constants'

export const navigationActions = {
  HeaderLoad,
  NavLoad
}

function HeaderLoad(params) {
  return {
    type: navigationConstants.NAVIGATION_LOAD,
    params
  }
}

function NavLoad(params) {
  return {
    type: navigationConstants.SUB_NAVIGATION_LOAD,
    params
  }
}
