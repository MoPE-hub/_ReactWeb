import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { composerActions } from '../../store/actions'
import { toast } from 'react-toastify'

import Debounce from '../../hook/debounce'
import BatchRegis from './BatchRegis'

const BatchList = props => {

  const { composer, input } = props
  const [ state, setState ] = useState({})
  const debounce = Debounce(state.searchKeyword, 500)

  const handleChange = (e) => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16)

    setState({
      ...state,
      [e.target.name]: e.target.value,
      color: randomColor
    })
  }

  const setExtension = (index, extensionIndex, e) => {
    props.setExtension({
      user: index,
      item: extensionIndex,
      value: e.target.value
    })
  }

  const checkUser = () => {
    if(!composer.users.length) {
      toast.info('계약 대상자를 추가하세요.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return false
    }
    return true
  }

  const checkInput = () => {

    const isValue = input.find(
      isValue => isValue.value === null || isValue.value === ''
    )

    if(isValue) {
      toast.info('추가하신 항목의 값을 입력하세요.', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return false
    }
    return true
  }

  const checkUserInput = () => {
    if(composer.users.length > 0 && input.length > 0) {

      for (var i = 0; i < composer.users.length; i++) {

        const isValue = composer.users[i].extensions.find(
          isValue => isValue.value === null || isValue.value === ''
        )

        if(!composer.users[i].extensions.length || isValue) {
          toast.info(composer.users[i].info.name + '님의 추가항목의 값을 입력하세요.', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          return false
        }
      }
    }
    return true
  }

  const checkValidation = () => {
    if(checkUser() && checkInput() && checkUserInput()) {
      alert('전송... 은 아닌데...')
    }
  }

  const searchData = composer.users.filter(item =>
    item.info.name.includes(debounce)
    || item.info.phone.includes(debounce)
    || (item.info.email ? item.info.email.includes(debounce) : '')
  )

  const users = state.searchKeyword ? searchData : composer.users

  useEffect(() => {
    // console.log(input)
  }, [input])

  return (
    <React.Fragment>
      <div className="modal-overlay">
        <div className="modal full modal-full">
          <div className="modal-content">

            <div className="modal-header">
              <div className="modal-title">계약 대상자 ({composer.users.length})</div>
              <button type="button" className="icon-close" data-dismiss="modal" aria-label="Close">
                <span
                  aria-hidden="true"
                  onClick={() => props.isBatchOpen()}
                >
                  &times;
                </span>
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-description">
                계약 대상자를 추가하고 삭제합니다.
              </div>
              <div className="modal-extension p-t-0">
                <div className="dis-flex">
                  <div
                    className="m-t-15"
                    style={{
                      "width": "30rem"
                    }}
                  >
                    <BatchRegis />
                  </div>

                  <div className=""
                    style={{
                      flex: "2",
                      position: "relative",
                      height: "45vh",
                      marginLeft: "1.5rem",
                      // display: "flex",
                      // flexFlow: "row nowrap",
                      // alignItems: "flex-end",
                      // justifyContent: "center",
                      // overflow: "hidden",
                      // flexDirection: "columns"
                    }}>

                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: "0",
                      left: "0"
                    }}>
                      <div className="component-box">
                        <ul className="component-list">
                          <li className="component-li full">
                            <div className="input-with-btn">
                              <input
                                type="text"
                                className="form-control input"
                                onChange={(e) => setState({
                                  ...state,
                                  searchKeyword: e.target.value
                                })}
                                placeholder="이름, 이메일, 휴대폰"
                              />
                              <span className="text">검색</span>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="card p-b-50">
                        <ul>
                          {
                            users.map((item, index) => (
                              <li key={index}>
                                <button
                                  type="button"
                                  className="icon-close"
                                  data-dismiss="modal"
                                  aria-label="delete"
                                  onClick={() => alert('없다')}
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                                <span className="name">
                                  <span
                                    className="color-dot"
                                    style={{"backgroundColor": "rgb(255, 87, 51)"}}
                                  ></span>
                                  {item.info.name}
                                </span>
                                <span>
                                  휴대폰: {item.info.phone}
                                </span>
                                {item.info.email ? <span>이메일: {item.info.email}</span> : ''}
                                {item.info.companyName ? <span>법인명: {item.info.companyName}</span> : ''}
                                {item.info.companyNumber ? <span>사업자: {item.info.companyNumber}</span> : ''}
                                {
                                  input.length > 0 ?
                                    <div className="expansion-wrap">
                                      {
                                        input.map((item, extensionsIndex) => {
                                          // console.log(composer.users[index].extensions[extensionsIndex])
                                          return (
                                            <span key={extensionsIndex} className="expansion">
                                              <span className="title">
                                                {!item.value ? "항목 이름을 적어주세요." : item.value}
                                              </span>
                                              <input
                                                className="form-control input-text sm"
                                                type="text"
                                                disabled={!item.value}
                                                onChange={(e) => setExtension(index, extensionsIndex, e)}
                                                defaultValue={composer.users[index].extensions[extensionsIndex] ? composer.users[index].extensions[extensionsIndex].value : ''}
                                              />
                                            </span>
                                        )})
                                      }
                                    </div>
                                  : ''
                                }
                              </li>
                            ))
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer top-line">
              <button
                className="btn btn-red btn-md"
                onClick={() => checkValidation()}
                disabled={!composer.users.length ? true : false}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    composer: state.composer,
    input: state.input
  }
}

const actionCreators = {
  setUsers: composerActions.setUsers,
  setExtension: composerActions.setExtension,
  setExtensions: composerActions.setExtensions,
  searchUser: composerActions.searchUser
}

export default connect(
  mapStateToProps,
  actionCreators
)(BatchList)
