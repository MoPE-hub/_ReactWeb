import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/style.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './App';
import rootReducer from './store/reducers'
import * as serviceWorker from './serviceWorker'

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

// import Amplify from 'aws-amplify';
// import config from './aws-exports';
// Amplify.configure(config);

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
    ))
)
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister()
