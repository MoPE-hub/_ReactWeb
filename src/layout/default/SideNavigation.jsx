import React, { Component } from 'react'
import { connect } from 'react-redux'
import { chatActions } from '../../store/actions'

import Icon from '../../component/svg/Svg'

class SideNavigation extends Component {

  constructor(props) {
    super(props)

    this.state = {
      //
    }
  }

  render() {
    const { toggle } = this.props
    const url = "/testsapmle.pdf"

    const pdfDownLoad = () => {
      window.location = url
    }

    return (
      <React.Fragment>
        <ul className="navbar-nav">
          <li>
            <div className="nav-snb">
              <ul>
                <li>
                  <span
                    className="icon-wrap"
                    tooltip="템플릿 관리"
                    flow="down"
                    onClick={() => alert('아직 없음')}
                  >
                    <Icon icon="template" width={24} height={24} />
                  </span>
                </li>
                <li>
                  <span className="icon-wrap" tooltip="가이드" flow="down">
                    <Icon icon="question" width={30} height={30} />
                  </span>
                </li>
                <li>
                  <span
                    className="icon-wrap"
                    tooltip="코멘트"
                    flow="down"
                    onClick={() => toggle('TOGGLE_POPUP')}
                  >
                    <Icon icon="chat" width={34} height={34} />
                  </span>
                </li>
                <li>
                  <span
                    className="icon-wrap"
                    tooltip="PDF로 저장"
                    flow="down"
                    onClick={() => pdfDownLoad()}
                  >
                    <Icon icon="pdf" width={30} height={30} />
                  </span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    //
  }
}

const actionCreators = {
  toggle: chatActions.toggle,
  // pdfDownLoad: .pdfDownLoad
}

export default connect(
  mapStateToProps,
  actionCreators
)(SideNavigation)
