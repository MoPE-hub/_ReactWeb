import { combineReducers } from 'redux'

import alertReducer from './alert/alert.reducer'
import loaderReducer from './loader/loader.reducer'
import composerReducer from './composer.reducer'
import columnsReducer from './columns.reducer'
import controllerReducer from './controller.reducer'
import chatReducer from './chat.reducer'
import contracterReducer from './contracter.reducer'
import inputReducer from './input.reducer'

const rootReducer = combineReducers({

  /*********
    모듈
  **********/

  alert: alertReducer,
  loader: loaderReducer,
  chat: chatReducer,
  contracter: contracterReducer,

  /*********
    캔버스
  **********/

  composer: composerReducer,
  columns: columnsReducer,
  controller: controllerReducer,

  /*********
    뷰
  **********/

  input: inputReducer
})

export default rootReducer
