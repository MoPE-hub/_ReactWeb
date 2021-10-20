import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class IntroduceBox extends Component {

  render() {
    return(
      <React.Fragment>
        <div className="introduce-box">

          {/*<div className="introduce">
            <div className="introduce-text">
              <ul>
                <li>이름: <span>옥성은</span></li>
                <li>생년월일: <span>1995.09.19</span></li>
                <li>이메일: <span>okseongeun4@gmail.com</span></li>
              </ul>
            </div>
          </div>*/}
          혼자 공부하고 배운것들을 끄적끄적 적어 놓는 곳입니다.
          사실 나중에 찾기가 너무 귀찮아서...
          
        </div>
      </React.Fragment>
    )
  }
}

export default IntroduceBox
