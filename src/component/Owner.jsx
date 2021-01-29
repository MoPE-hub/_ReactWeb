import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { composerActions, contracterActions } from '../store/actions'

const Owner = props => {

  const { composer, columns, setComponent, controller, send } = props

  const [ state, setState ] = useState({
    isComposerOpen: false,
    isIndex: ''
  })

  const toggleInfo = (index) => {
    setState({
      ...state,
      isIndex: state.isIndex === index ? '' : index
    })
  }

  const isComposerOpen = () => {
    setState({
      ...state,
      isComposerOpen: !state.isComposerOpen
    })
  }

  useEffect(() => {
    // props.contracter()
  }, [props, composer.users])

  return controller.viewType === 'COMPOSE' ? (
    <React.Fragment>
      {
        composer.requester.length > 0 ? composer.requester.map((item, index) => (
          <div
            key={index}
            className="player-wrap"
          >
            <div className="player">
              <div className="hand">
                <ul>
                  <li onClick={() => toggleInfo(index)}>
                    <span
                      className="color-dot"
                      style={{'backgroundColor': '#' + item.info.color}}
                    >
                    </span>
                    {item.info.name}
                    <span className={`icon ${state.isIndex === index ? 'icon-arrow-up' : 'icon-arrow-down'}`}></span>
                  </li>
                  {
                    state.isIndex === index ?
                      <span className="player-detail m-t-10">
                        <li>{item.info.phone}</li>
                        {item.info.email ? <li>{item.info.email}</li> : ''}
                        {item.info.companyName ? <li>{item.info.companyName}</li> : ''}
                        {item.info.companyNumber ? <li>{item.info.companyNumber}</li> : ''}
                      </span>
                    : ''
                  }
                </ul>
              </div>

              <button
                type="button"
                className="icon-close"
                data-dismiss="modal"
                aria-label="delete"
                onClick={() => props.deleteRequester(item)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            {
              composer.requester.length > 0 ?
                <React.Fragment>
                  <div
                    className="option-wrap"
                  >
                    <input
                      id="noSign"
                      name="noSign"
                      type="checkbox"
                      className="checkbox small"
                      checked={state.common}
                      onChange={() => setState({
                        common: !state.common
                      })}
                    />

                    <label htmlFor="noSign">
                      요청자의 서명은 필요 없음
                    </label>
                  </div>
                </React.Fragment>
              : ''
            }

            {
              !state.common ?
                <div className="insert-component m-t-10">
                  <div className="inner">
                    <button
                      className="btn btn-blac kbtn-md btn-full"
                      onClick={() => setComponent({
                        type: 'SET_TEXT_BOX',
                        user: {
                          index: index,
                          userInfo: item.info
                        }
                      })}
                    >
                      <div className="insert-text">
                        <span className="title">텍스트 입력</span>
                        <span className="counter">
                          {item.components.textBoxes.length}
                        </span>
                      </div>
                    </button>

                    <button
                      className="btn btn-blackbtn-md btn-full"
                      onClick={() => setComponent({
                        type: 'SET_CHECK_BOX',
                        user: {
                          index: index,
                          userInfo: item.info
                        }
                      })}
                    >
                      <div className="insert-text">
                        <span className="title">체크박스</span>
                        <span className="counter">
                          {item.components.checkBoxes.length}
                        </span>
                      </div>
                    </button>

                    <button
                      className="btn btn-blackbtn-md btn-full"
                      onClick={() => setComponent({
                        type: 'SET_SIGN',
                        user: {
                          index: index,
                          userInfo: item.info
                        }
                      })}
                    >
                      <div className="insert-sign">
                        <span className="title">전자서명</span>
                        <span className="counter">
                          {item.components.signs.length}
                        </span>
                      </div>
                    </button>

                    <button
                      className="btn btn-blackbtn-md btn-full"
                      onClick={() => setComponent({
                        type: 'SET_SIGN_PAD',
                        user: {
                          index: index,
                          userInfo: item.info
                        }
                      })}
                    >
                      <div className="insert-sign-pad">
                        <span className="title">전자서명 패드</span>
                        <span className="counter">
                          {item.components.signPads.length}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              : ''
            }
          </div>
        ))
        :
        <div className="no-data">계약 요청자를 입력하세요.</div>
      }

    </React.Fragment>
  ) : null
}

const mapStateToProps = state => {
  return {
    composer: state.composer,
    controller: state.controller,
    columns: state.columns
  }
}

const actionCreators = {
  deleteRequester: composerActions.deleteRequester,
  setComponent: composerActions.setComponent,
  send: composerActions.send,
  contracter: contracterActions.contracter
}

export default connect(
  mapStateToProps,
  actionCreators
)(Owner)
