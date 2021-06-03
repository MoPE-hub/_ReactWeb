import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import IntroduceBox from './IntroduceBox'
import BarAnimation from "./AnimationBar";

class Main extends Component {

  render() {
    return(
      <React.Fragment>
        <div className="wrap">
          {/*<IntroduceBox />*/}
          <div>
            <span>안녕하세료~</span>
            <span>엉망인 페이지입니다.</span>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Main
