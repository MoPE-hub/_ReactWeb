import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { composerActions, contracterActions } from '../store/actions'

import Contracter from '../module/contracter'
import Owner from './Owner'
// import Batch from './Batch'
import Batch from './BatchTemp'
import AddUser from './AddUser'
import AddOwner from './AddOwner'
import AddColumnsComposer from './AddColumnsComposer'

const Composer = props => {

  const { composer, columns, setComponent, controller, send } = props

  const [ state, setState ] = useState({
    isComposerOpen: false,
    isAddOwnerOpen: false,
    type: 1 //0 일반, 1일괄, 2청약
  })

  const isComposerOpen = () => {
    setState({
      ...state,
      isComposerOpen: !state.isComposerOpen
    })
  }

  const isAddOwnerOpen = () => {
    setState({
      ...state,
      isAddOwnerOpen: !state.isAddOwnerOpen
    })
  }

  useEffect(() => {
    // props.contracter()
  }, [props, composer.users])

  return controller.viewType === 'COMPOSE' ? (
    <React.Fragment>
      <div className="composer-wrap">
        <div className="composer-inner">
          <div className="add-player">

            {/*
              <div className="radio-group m-b-20">
                <input
                  type="radio"
                  id="individual"
                  name="selector"
                  defaultChecked={true}
                  onChange={() => setState({
                    ...state,
                    type: 0
                  })}
                />
                <label htmlFor="individual">
                  일반
                </label>

                <input
                  type="radio"
                  id="chkPkg"
                  name="selector"
                  onChange={() => setState({
                    ...state,
                    type: 1
                  })}
                />
                <label htmlFor="chkPkg">
                  일괄
                </label>

                <input
                  type="radio"
                  id="chkAgr"
                  name="selector"
                  onChange={() => setState({
                    ...state,
                    type: 2
                  })}
                />
                <label htmlFor="chkAgr">
                  청약서
                </label>
              </div>
            */}


            {
              state.type === 0 ?
                <button
                  className="btn btn-black btn-md btn-full"
                  onClick={() => isComposerOpen()}
                >
                  참여자 추가 <span>[{composer.users.length}]</span>
                </button>
              : ''
            }

            {
              state.type === 1 ?
                <button
                  className="btn btn-black btn-md btn-full"
                  onClick={() => isAddOwnerOpen()}
                  disabled={composer.requester.length > 0 ? true : false}
                >
                  요청자 설정
                </button>
              : ''
            }

          </div>

          {/*
            state.isComposerOpen ?
              <AddUser isComposerOpen={() => isComposerOpen()}/>
            : ''
          */}

          {
            state.isAddOwnerOpen ?
              <AddOwner isAddOwnerOpen={() => isAddOwnerOpen()}/>
            : ''
          }

          <div className="players">

          {/*
            state.type === 0 && composer.users.length > 0 ? composer.users.map((item, index) => (
              <div
                key={index}
                className="player-wrap"
              >
                <div className="player">
                  <input type="checkbox" id={index} />
                  <label htmlFor={index}>
                    <ul>
                      <li>
                        <span
                          className="color-dot"
                          style={{'backgroundColor': '#' + item.info.color}}
                        >
                        </span>
                        {item.info.name}
                        <span className="icon icon-arrow-down"></span>
                      </li>

                      <span
                        className="collapse"
                      >
                        {
                          <li>{item.info.phone}</li>
                        }
                        {
                          item.info.email ? <li>{item.info.email}</li> : ''
                        }
                        {
                          item.info.companyName ? <li>{item.info.companyName}</li> : ''
                        }
                        {
                          item.info.companyNumber ? <li>{item.info.companyNumber}</li> : ''
                        }
                      </span>
                    </ul>
                  </label>

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
              </div>
            ))
            :
            composer.users.length > 1 ? <div className="no-data">참여자를 입력해주세요.</div> : ''
          */}

          {
            state.type === 1 ?
              <React.Fragment>
                <Owner />
                <Batch />
              </React.Fragment>
            : ''
          }

          {
            state.type === 2 ?
              <div className="p-t-20 text-center">청약은 뭐가 다른가????</div>
            : ''
          }

          {/**/
            state.type !== 2 ?
              <AddColumnsComposer />
            : ''
          }

          </div>
        </div>

        <div className="complete-wrap">
          <button
            className="btn btn-md btn-full btn-red"
            onClick={() => send({
              data: {
                composer: composer.users,
                expansion: columns.columns
              }
            })}
            disabled={composer.isSetSign.length === composer.users.length ? false : true}
          >
            저장
          </button>
        </div>
      </div>

      <Contracter />

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
)(Composer)
