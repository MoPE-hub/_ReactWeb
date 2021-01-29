import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './App';
import rootReducer from './store/reducers'
import * as serviceWorker from './serviceWorker'

import { ToastContainer } from 'react-toastify'
import './assets/sass/style.scss'

import pdfjs from "pdfjs-dist"
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry"

// import pdfjs from "../module/pdfjs-dist"
// import pdfjsWorker from "../module/pdfjs-dist/build/pdf.worker.entry"

const store = createStore(
  rootReducer,
  composeWithDevTools(
  applyMiddleware(
    thunk,
    /*logger,
    readyStatePromise,
    timeoutScheduler,
    rafScheduler,
    vanillaPromise,
    crashReporter*/
  ))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer closeButton={false} />
  </Provider>,
  document.getElementById('app')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker
