import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Header from '../component/default/Header'
import Navigation from "../component/default/Navigation";

const SubLayout = ({ children }) => {

  return (
    <React.Fragment>
      <Header />
      <Navigation />
      {children}
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  navigationLoad: state.navigation
})

const actionCreators = {
  //
}

export default connect(
  mapStateToProps,
  actionCreators,
)(SubLayout)
