import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Tab extends Component {
  render() {
    return(
      <React.Fragment>
        <div className="tab-component">
          <ul>
            <li>
              <Link to="./" className="active" data="ALL">전체</Link>
            </li>
            <li>
              <Link to="./" className="cancel" data="A">
                  발송전 <span id="cnt1">22</span>
                  </Link>
              </li>
            <li>
              <Link to="./" className="ing" data="B">
                진행중 <span id="cnt2">57</span>
              </Link>
              <ul className="tab-sub">
                <li>
                  <span className="sub-title" data="B1">
                  진행
                  <span id="cnt21">3</span>
                  </span>
                </li>
                <li>
                  <span className="sub-title" data="B2">
                  만료
                  <span id="cnt22">41</span>
                  </span>
                  </li>
                <li>
                  <span className="sub-title" data="B3">
                  취소
                  <span id="cnt23">13</span>
                  </span>
                </li>
              </ul>
            </li>
            <li>
              <Link to="./" className="new" data="C">
                완료
                <span id="cnt3">63</span>
              </Link>
            </li>
          </ul>
        </div>
      </React.Fragment>
    )
  }
}

export default Tab
