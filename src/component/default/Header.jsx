import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {commonActions, navigationActions} from '../../store/actions'
import isNav from "../../store/reducers/common.reducers";
import NavigationList from "../../json/HeaderList.json";
import nav from "../../store/reducers/navigation.reducers";

const Header = props => {

  const { HeaderNav } = props

  const [ state, setState ] = useState({})

  useEffect(() => {
    props.HeaderLoad()
  }, [HeaderNav])

  return(
    <React.Fragment>
      <header>
        <div className="header-box">
          <ul>
            {
              props.nav.HeaderList.map((data, index) => {
                return (
                  <li onClick={() => props.NavLoad(data.title)} key={index}>
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
    common: state.common,
    SubNav: state.nav,
    nav: state.nav
  }
}

const actionCreators = {
  navOpen: commonActions.navOpen,
  NavLoad: navigationActions.NavLoad,
  HeaderLoad: navigationActions.HeaderLoad
}

export default connect(
  mapStateToProps,
  actionCreators
)(Header)