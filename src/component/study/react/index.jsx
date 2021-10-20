import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from "react-redux";

const ReactMain = (props) => {

  return(
    <React.Fragment>
      <div className="description-box">
        <h4 className="title">React를 공부하면서 이것저것 적어놓은 곳</h4>
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
)(ReactMain)
