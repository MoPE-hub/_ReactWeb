import { loaderConstants } from '../../constants'

const initialState = {
  isLoading: false,
}

export default function loader(state = initialState, action) {
  switch (action.type) {
    case loaderConstants.LOADER:
      return {
        isLoading: !state.isLoading
      }
    default:
      return state
  }
}
