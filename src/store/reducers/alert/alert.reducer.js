import { alertConstants } from '../../constants'

const initialState = {
  title: '',
  type: '',
  message: '',
  isShow: false,
  isConfirm: false,
  params: ''
}

export default function alert(state = initialState, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        ...state,
        type: "SUCCESS",
        title: action.params.title,
        message: action.params.message,
        isShow: !state.isShow
      }

    case alertConstants.ERROR:
      return {
        ...state,
        type: "ERROR",
        title: action.params.title,
        message: action.params.message,
        isShow: !state.isShow
      }

    case alertConstants.CONFIRM:
      return {
        ...state,
        type: "CONFIRM",
        title: action.params.title,
        message: action.params.message,
        params: action.params,
        isShow: !state.isShow
      }

    case alertConstants.CLEAR:
      return {
        ...state,
        type: "CLEAR",
        isShow: !state.isShow
      }

    default:
      return state
  }
}
