import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FixBackground from '../assets/images/bg-fix.png'

import IntroduceBox from './IntroduceBox'
import PortfolioBox from './PortfolioBox'

class Main extends Component {

  render() {
    return(
      <React.Fragment>
        <div className="wrap">
          <IntroduceBox />
          <PortfolioBox />
          <img src={FixBackground} alt="배경" className="background-img"/>
        </div>
      </React.Fragment>
    )
  }
}

export default Main
