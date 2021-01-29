import React from 'react'
import { connect } from 'react-redux'

import TextBox from './TextBox'
import CheckBox from './CheckBox'
import Sign from './Sign'
import SignPad from './SignPad'
import Expansion from './Expansion'

const Editor = props => {

  return (
    <React.Fragment>
      <TextBox />
      <CheckBox />
      <Sign />
      <SignPad />
      <Expansion />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    //
  }
}

export default connect(
  mapStateToProps
)(Editor)
