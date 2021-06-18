import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Header from '../component/default/Header'
import Navigation from "../component/default/Navigation";

const DefaultLayout = ({ children }) => {

  return (
    <React.Fragment>
			<Header />
        {children}
      <Navigation />
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  //
})

const actionCreators = {
  //
}

export default connect(
  mapStateToProps,
  actionCreators,
)(DefaultLayout)
