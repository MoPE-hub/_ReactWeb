import React from 'react'
import { connect } from 'react-redux'

const Validator = props => {

  const validator = (val) => {
    this.error = []
    this.val = val
    this.isRequired = () => {
      if (!this.val) {
        this.error.push('This field is required')
      }
      return this
    }
    this.isEmail = () => {
     const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
     if (this.val && !filter.test(this.val)) {
        this.error.push('Invalid Email')
     }
     return this
    }
    return this
  }

  return(
    <React.Fragment></React.Fragment>
  )
}

const mapStateToProps = dispatch => {
  return {
    //
  }
}

export default connect(
  mapStateToProps
)(Validator)
