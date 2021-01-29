import React, { useState } from 'react'
import { connect } from 'react-redux'
import Kmc from '../../module/cert/kmc'

const Auth = props => {

  const [ state, setState ] = useState(false)

  return (
    <React.Fragment>
      <div
        className="auth"
      >
        <div className="brand"></div>

        <div
          className="title"
        >
          <h4><span className="text-underline">박민우님</span>에게 계약서가 도착했습니다.</h4>

          <h6
            className="thin m-t-10 m-b-20"
          >
            열람하시려면 본인인증 버튼을 눌러주세요
          </h6>

          <h6
            className="thin m-t-40 m-b-50"
          >
            발신인: <span className="text-underline">APWISDOM</span>
          </h6>
        </div>

        <button
          className="btn btn-black btn-md"
          onClick={() => setState(true)}
        >
          본인인증
        </button>
      </div>

      <Kmc state={state} />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    //
  }
}

const actionCreators = {
  //
}

export default connect(
  mapStateToProps,
  actionCreators
)(Auth)
