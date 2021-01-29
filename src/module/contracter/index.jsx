import React from 'react'
import ContracterPopUp from './Contracter'
import { connect } from 'react-redux'

const Contracter = props => {

  const { toggleContracter } = props

  return (
    <React.Fragment>
      <ContracterPopUp toggleContracter={toggleContracter} />
    </React.Fragment>
  )
}

/*컴포넌트에 연결*/
const mapDispatchToProps = dispatch => {
  return {
    toggleContracter: () => {
      dispatch({ type: 'TOGGLE_CONTRACTER' })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Contracter)
