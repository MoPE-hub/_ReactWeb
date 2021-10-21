import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from "react-redux";

const Html = (props) => {

  return(
    <React.Fragment>
      <div className="description-box">

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
)(Html)
