import { loaderConstants } from '../../constants'

export const loaderActions = {
  loading
}

function loading() {
  return {
    type: loaderConstants.LOADER
  }
}
