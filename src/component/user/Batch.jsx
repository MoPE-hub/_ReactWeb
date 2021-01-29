import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { composerActions, contracterActions } from '../../store/actions'
import BatchList from './BatchList'
import Icon from '../../component/svg/Svg'

const Batch = props => {

  const { composer, columns, setComponent, controller, send } = props

  const [ state, setState ] = useState({
    isBatchOpen: false,
    isUserListOpen: false,
    common: false,
    isIndex: 0
  })

  const toggleInfo = (index) => {
    setState({
      ...state,
      isIndex: state.isIndex === index ? '' : index
    })
  }

  const isBatchOpen = () => {
    setState({
      ...state,
      isBatchOpen: !state.isBatchOpen
    })
  }

  useEffect(() => {
    // props.contracter()
  }, [props, composer.users])

  return controller.viewType === 'COMPOSE' ? (
    <React.Fragment>

      <div className="player-wrap">
        <div className="section">
          <span
            onClick={() => setState({
              isUserListOpen: !state.isUserListOpen
            })}
          >
            계약 대상자 ({composer.users.length})
            <span
              className={`icon ${state.isUserListOpen ? 'icon-arrow-up' : 'icon-arrow-down'}`}
            >
            </span>
          </span>

          <button
            type="button"
            className="icon-add"
            data-dismiss="modal"
            aria-label="add"
            onClick={() => isBatchOpen()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {
          state.isUserListOpen ?
            <React.Fragment>
              {
                composer.users.length > 1 ?
                  <div className="option-wrap">
                    <input
                      id="common"
                      name="common"
                      type="checkbox"
                      className="checkbox small"
                      checked={state.common}
                      onChange={() => setState({
                        ...state,
                        common: !state.common
                      })}
                    />

                    <label htmlFor="common">
                      일괄 적용
                    </label>
                  </div>
                : ''
              }

              {
                state.common ?
                  <React.Fragment>
                    <div className="option-title">
                      {composer.users.length}명 일괄 적용
                    </div>

                    <div className="insert-component">
                      <div className="inner">
                        <button
                          className="btn btn-blac kbtn-md btn-full"
                          onClick={() => setComponent({
                            type: 'SET_TEXT_BOX',
                            user: {
                              index: 0,
                              userInfo: ""
                            }
                          })}
                        >
                          <div className="insert-text">
                            <span className="title">텍스트 입력</span>
                            <span className="counter">
                              0
                            </span>
                          </div>
                        </button>

                        <button
                          className="btn btn-blackbtn-md btn-full"
                          onClick={() => setComponent({
                            type: 'SET_CHECK_BOX',
                            user: {
                              index: 0,
                              userInfo: ""
                            }
                          })}
                        >
                          <div className="insert-text">
                            <span className="title">체크박스</span>
                            <span className="counter">
                              0
                            </span>
                          </div>
                        </button>

                        <button
                          className="btn btn-blackbtn-md btn-full"
                          onClick={() => setComponent({
                            type: 'SET_SIGN',
                            user: {
                              index: 0,
                              userInfo: ""
                            }
                          })}
                        >
                          <div className="insert-sign">
                            <span className="title">전자서명</span>
                            <span className="counter">
                              0
                            </span>
                          </div>
                        </button>

                        <button
                          className="btn btn-blackbtn-md btn-full"
                          onClick={() => setComponent({
                            type: 'SET_SIGN_PAD',
                            user: {
                              index: 0,
                              userInfo: ""
                            }
                          })}
                        >
                          <div className="insert-sign-pad">
                            <span className="title">전자서명 패드</span>
                            <span className="counter">
                              0
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </React.Fragment>
                : ''
              }

              {
                !state.common && composer.users.length > 0 ? composer.users.map((item, index) => (
                  <React.Fragment key={index}>
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
                        onClick={() => props.deleteUser(item)}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    <div className="insert-component">
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
                  </React.Fragment>
                ))
                : ''
              }

              {
                composer.users.length < 1 ? <div className="no-data hand" onClick={() => isBatchOpen()}>계약 대상자를 입력하세요.</div> : ''
              }

            </React.Fragment>
          : ''
        }
      </div>
      {
        state.isBatchOpen ?
          <BatchList isBatchOpen={() => isBatchOpen()} />
        : ''
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
  deleteUser: composerActions.deleteUser,
  setComponent: composerActions.setComponent,
  send: composerActions.send,
  contracter: contracterActions.contracter
}

export default connect(
  mapStateToProps,
  actionCreators
)(Batch)
