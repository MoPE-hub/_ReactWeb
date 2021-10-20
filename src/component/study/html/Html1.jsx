import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from "react-redux";

const Html1 = (props) => {

  return(
    <React.Fragment>
      <div className="wrap">
        html
      </div>
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
)(Html1)
