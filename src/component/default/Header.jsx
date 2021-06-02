import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {

  render() {
    return(
      <React.Fragment>
        <header>
          <div className="header-box">
            <ul>
              <li><Link to="/">소개</Link></li>
              <li><Link to="/portfolio">페이지 작업</Link></li>
              <li><Link to="/animation">애니메이션</Link></li>
            </ul>
          </div>
        </header>
      </React.Fragment>
    )
  }
}

export default Header