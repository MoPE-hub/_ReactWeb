import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {connect} from "react-redux";
import {navigationActions} from "../store/actions";

const Main = (props) => {

  return(
    <React.Fragment>
      <div className="wrap">
        <div className="main">
          <h3 className="text-blue">그냥 혼자 이것저것 적어놓는 곳</h3>
          <div className="link-box">
            <ul className="dis-flex">
              <li><Link to="/html" onClick={() => props.NavLoad('HTML')}>HTML</Link></li>
              <li><Link to="/css" onClick={() => props.NavLoad('CSS')}>CSS</Link></li>
              <li><Link to="/javascript" onClick={() => props.NavLoad('JavaScript')}>Javascript</Link></li>
            </ul>
            <ul className="dis-flex">
              <li><Link to="/react" onClick={() => props.NavLoad('React')}>React.js</Link></li>
              <li><Link to="/vue" onClick={() => props.NavLoad('Vue')}>Vue.js</Link></li>
              <li><Link to="/react-native" onClick={() => props.NavLoad('React-Native')}>React-Native</Link></li>
            </ul>
          </div>

          <span className="explain text-center">
            이곳에 작성되어 있는 글은 직접 퍼블리싱하고 모든 컴포넌트를 직접 작성해서 만든 것 입니다.
            <br />
            백엔드, DB작업은 전혀 되어 있지 않습니다.
          </span>

        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  //
})

const actionCreators = {
  NavLoad: navigationActions.NavLoad
}

export default connect(
  mapStateToProps,
  actionCreators,
)(Main)
