import { inputConstants } from '../constants'

export const initialState = []

export default function input(state = initialState, action) {
  switch (action.type) {
    case inputConstants.ADDS:
      const columns = action.data[0].map((item, index) => {
        if(index > 4) {
          state.push({
            value: item
          })
        }
        return state
      })
      return [
        ...state
      ]
    case inputConstants.ADD:
      return [
        ...state,
        action.data
      ]
    case inputConstants.REMOVE:
      state.splice(action.data.index, 1)
      return [
        ...state
      ]
    case inputConstants.UPDATE:
      state[action.data.index]["value"] = action.data.value
      return [
        ...state
      ]
    default:
      return state
  }
}
