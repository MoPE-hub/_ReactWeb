import React, { useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { alertActions } from '../../store/actions'

import PDFController from './PDFController'
import PreViewController from './PreViewController'
import SideNavigation from './SideNavigation'

const DefaultHeader = props => {

  const { auth } = props
  const location = useLocation()

  const PreViewPath = location.pathname

  /******************
    패스 & 아이핀 인증
  ******************/

  useEffect(() => {
    if(location['search'] && !auth.isCert && !auth.isFailure) {
      window.opener.postMessage(location['search'])
      window.close()
    }
  }, [auth, location])

  /******************
    패스 & 아이핀 인증 끝..
  ******************/

  return(
    <React.Fragment>
      <header className="canvas">
        <nav className="navbar">

          {/*
          <Link to="/" className="navbar-brand">
            PaperLess
          </Link>
          */}

          <div className="navbar-gnb">
            <div className="gnb-wrap m-l-10">

              {
                PreViewPath === "/preview" ? <PreViewController /> : <PDFController />
              }

              <ul className="navbar-nav">
                <li>
                  {/*
                  <NavLink to="/canvas" activeClassName="active">
                    뒤로
                  </NavLink>
                  */}
                </li>
              </ul>
            </div>
          </div>

          <div className="navbar-collapse">
            <SideNavigation />
          </div>
        </nav>
        {/*
        <sub-nav>
          <span className="status">
            계약서명/일반/일괄/청약 작성중/완료 템플릿 저장... 상태 표시줄..
          </span>
        </sub-nav>
        */}
      </header>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    // auth: state.auth
  }
}

const actionCreators = {
  confirm: alertActions.confirm,
  // 이거 테스트임..
  // setCert: userActions.setCert
}

export default connect(
  mapStateToProps,
  actionCreators
)(DefaultHeader)
