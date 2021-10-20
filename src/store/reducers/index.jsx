import { combineReducers } from 'redux'

import authReducer from './auth.reducers'
import commonReducer from './common.reducers'
import navigationReducer from './navigation.reducers'

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import nav from "./navigation.reducers";

// localStorage에 저장하고 싶으면
// import storage from 'redux-persist/lib/storage

// session Storage에 저장하고 싶으면
// import storageSession from 'redux-persist/lib/storage/session

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  blacklist: ["navigationReducer"]
  // blacklist -> 그것만 제외합니다
};

const rootReducer = combineReducers({

  // auth: authReducer,

  common: commonReducer,
  nav: navigationReducer
});

export default persistReducer(persistConfig, rootReducer);