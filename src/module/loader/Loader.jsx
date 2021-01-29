import React from 'react'
import { connect } from 'react-redux'

import {
  loaderActions
} from '../../store/actions'

const Loader = (props) => {

  return(
    <React.Fragment>
      {
        props.loader.isLoading ?

          <div className="loader">
            <div className="spinner spinner--double-bounce">
              <div className="double-bounce1 bounceStyle"></div>
              <div className="double-bounce2 bounceStyle"></div>
            </div>
          </div>

        : ''
      }
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    loader: state.loader
  }
}

const actionCreators = {
  loader: loaderActions.loader
}

export default connect(
  mapStateToProps,
  actionCreators
)(Loader)
