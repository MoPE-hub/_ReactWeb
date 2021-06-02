import React, { Component } from 'react'

import BarAnimation from "./animation/bar";

class Animation extends Component {

  render() {
    return(
      <React.Fragment>
        <div className="animation-wrap">
          <ul className="animation-list-box">
            <li>
              <BarAnimation />
            </li>
          </ul>
        </div>
      </React.Fragment>
    )
  }
}

export default Animation
