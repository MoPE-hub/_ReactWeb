import React from 'react'
import { connect } from 'react-redux'

import Header from './default/Header'
import Footer from './default/Footer'
import Alert from '../module/alert/'
import Chat from '../module/chat/'

const DefaultLayout = ({ children }) => {
  return (
    <React.Fragment>
			<Header />
        {children}
      <Footer />
			<Alert />
      <Chat />
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  // auth: state.auth,
})

export default connect(
  mapStateToProps,
  null,
)(DefaultLayout)
