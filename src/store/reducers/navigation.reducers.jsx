import { navigationConstants } from '../constants'
import HeaderList from '../../json/HeaderList.json'
import NavigationList from '../../json/SubNavList.json'

const initialState = {
  HeaderList: [],
  subNavList: []
}

export default function nav(state = initialState, action) {
  switch (action.type) {
    case navigationConstants.NAVIGATION_LOAD:
      return {
        ...state,
        HeaderList: HeaderList.NavigationList
      }
    case navigationConstants.SUB_NAVIGATION_LOAD:
      return {
        ...state,
        subNavList: NavigationList.NavigationList[action.params]
      }
    default:
      return state
  }
}

