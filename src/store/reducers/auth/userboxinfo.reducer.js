import { userboxinfoConstants } from '../../constants'

const initialState = {
  data: [],
  recordItems:[],
  isLoading: false,
  isFailure: false
}

export default function userboxinfo(state = initialState, action) {
  switch (action.type) {

    /*********
     리스트
    **********/

    case userboxinfoConstants.USERBOXINFO_LOAD_REQUEST:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    case userboxinfoConstants.USERBOXINFO_LOAD_SUCCESS:
      return {
        ...state,
        data: action.response.data
      }
    case userboxinfoConstants.USERBOXINFO_LOAD_FAILURE:
      return {
        isLoading: false,
        isFailure: true
      }

    /*********
     사서함폐쇄
    **********/

    case userboxinfoConstants.USERBOXINFO_CLOSE_REQUEST:
      return {
        ...state,
        isLoading: !state.isLoading
      }
    case userboxinfoConstants.USERBOXINFO_CLOSE_SUCCESS:
      return {
        ...state,
        data: action.response.data
      }
    case userboxinfoConstants.USERBOXINFO_CLOSE_FAILURE:
      return {
        isLoading: false,
        isFailure: true
      }
    default:
      return state
  }
}
