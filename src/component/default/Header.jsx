import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { commonActions } from '../../store/actions'
import isNav from "../../store/reducers/common.reducers";
import NavigationList from "./NavList";

const Header = props => {

  const [ state, setState ] = useState({})

  // const { nav } = props

  return(
    <React.Fragment>
      <header>
        <div className="header-box">
          <div>
            <span className="icon-gnb" onClick={() => props.navOpen()}></span>
          </div>
          <ul>
            {
              NavigationList.map((data, index) => {
                return (
                  <li key={index}>
                    <Link to={data.link}>{data.title}</Link>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </header>
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
)(Header)