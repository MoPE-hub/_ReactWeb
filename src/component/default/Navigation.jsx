import React, { useState, useEffect } from 'react'
import {commonActions} from "../../store/actions";
import {connect} from "react-redux";
import { Link } from 'react-router-dom'
import FixBackground from "../../assets/images/bg-fix.png";
import NavigationList from './NavList'
import { ArrowRight } from '../svg/svg'

const Navigation = props => {

  return(
    <React.Fragment>
      <div className={`navigation-wrap ${props.common.isOpen ? '' : 'none'}`}>

        <div className="navigation-box">
          <ul className="navigation-list">
            {
              NavigationList.map((data, index) => {
                return (
                  <li onClick={() => props.navOpen()} key={index}>
                    <ArrowRight />
                    <Link to={data.link}>{data.title}</Link>
                  </li>
                )
              })
            }
          </ul>
          {/*<button onClick={() => props.navOpen()} style={{"margin":"200px"}}>닫기</button>*/}
        </div>
        <img src={FixBackground} className="img-navigation" alt="네비게이션 이미지"/>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    common: state.common
  }
}

const actionCreators = {
  navOpen: commonActions.navOpen,
}

export default connect(
  mapStateToProps,
  actionCreators
)(Navigation)