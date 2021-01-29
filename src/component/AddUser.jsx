import React, { useState } from 'react'
import { connect } from 'react-redux'
import { composerActions } from '../store/actions'
import { toast } from 'react-toastify'

const AddUser = props => {

  const [ state, setState ] = useState({})

  const handleChange = (e) => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16)

    setState({
      ...state,
      [e.target.name]: e.target.value,
      color: randomColor
    })
  }

  const setUser = () => {
    if(!state.isCompany && (!state.name || !state.phone)) {
      toast.info('모든 정보를 입력하세요.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }

    if(state.isCompany && (!state.name || !state.phone || !state.companyName || !state.companyNumber)) {
      toast.info('법인/단체 정보를 입력하세요.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }

    props.setUsers(state)

    setState({
      // 초기화
    })
  }

  return (
    <React.Fragment>
      <div className="modal-overlay">
        <div className="modal modal-large">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                계약 참여자 추가
              </div>
              <button
                type="button"
                className="icon-close"
                data-dismiss="modal" aria-label="Close"
                onClick={() => props.isComposerOpen()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-description">
                개인/법인 계약 참여자를 추가해주세요
              </div>
              <div className="modal-extension p-l-10 p-r-10 p-b-10">

                <input type="radio" id="type-0" name="player-type" className="group" defaultChecked="{true}" />
                <input type="radio" id="type-1" name="player-type" className="group" />

                <div className="radio-group">
                  <label
                    htmlFor="type-0"
                    className="type-0"
                    onClick={() => setState({isCompany: false})}
                  >
                    개인
                  </label>
                  <label
                    htmlFor="type-1"
                    className="type-1"
                    onClick={() => setState({isCompany: true})}
                  >
                    법인
                  </label>
                </div>

                <div className="required m-t-20">
                  <input
                    name="name"
                    type="text"
                    placeholder="계약자명"
                    className="form-control input-text m-b-10"
                    value={state.name ? state.name : ''}
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    name="phone"
                    type="number"
                    placeholder="휴대폰"
                    className="form-control input-text m-b-10"
                    value={state.phone ? state.phone : ''}
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    name="email"
                    type="email"
                    className="form-control input-text m-b-10 imeEngMode"
                    placeholder="이메일(선택)"
                    value={state.email ? state.email : ''}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {
                  state.isCompany ?
                    <div className="input-control">
                      <input
                        name="companyName"
                        type="text"
                        className="form-control input-text m-b-10 required-field"
                        placeholder="사업자명"
                        value={state.companyName ? state.companyName : ''}
                        onChange={(e) => handleChange(e)}
                      />
                      <input
                        name="companyNumber"
                        type="text"
                        className="form-control input-text m-b-10"
                        placeholder="사업자등록번호"
                        defaultValue={state.companyNumber ? state.companyNumber : ''}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  : ''
                }

                <button
                  type="button"
                  className="btn btn-md btn-full btn-dark-gray m-t-20"
                  onClick={() => setUser()}
                >
                  {
                    state.isCompany ? "법인/단체 참여자 추가" : "개인 참여자 추가"
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    composer: state.composer
  }
}

const actionCreators = {
  setUsers: composerActions.setUsers
}

export default connect(
  mapStateToProps,
  actionCreators
)(AddUser)
