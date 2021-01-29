import React, { useState } from 'react'
import { connect } from 'react-redux'
import { composerActions } from '../store/actions'
import { toast } from 'react-toastify'

const AddOwner = props => {

  const [ state, setState ] = useState({})

  const handleChange = (e) => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16)

    setState({
      ...state,
      [e.target.name]: e.target.value,
      color: randomColor
    })
  }

  const setRequester = () => {
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

    props.setRequester(state)
    props.isAddOwnerOpen()

    setState({
      // 초기화
    })
  }

  const setMyInfo = () => {

    const randomColor = Math.floor(Math.random()*16777215).toString(16)

    setState({
      ...state,
      name: !state.name ? "나다미누" : "",
      phone: !state.phone ? "01086246431" : "",
      email: !state.email ? "78minu@navercom" : "",
      companyName: !state.companyName ? "회사명" : "",
      companyNumber: !state.companyNumber ? "법인번호" : "",
      color: randomColor
    })
  }

  const setType = (type) => {
    setState({
      ...state,
      isCompany: type
    })
  }

  return (
    <React.Fragment>
      <div className="modal-overlay">
        <div className="modal modal-large">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                계약 요청자 설정
              </div>
              <button
                type="button"
                className="icon-close"
                data-dismiss="modal" aria-label="Close"
                onClick={() => props.isAddOwnerOpen()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-description">
                <input
                  type="checkbox"
                  defaultChecked={false}
                  id="myInfo"
                  className="checkbox small"
                  onChange={() => setMyInfo()}
                />
                <label htmlFor="myInfo">내정보 입력</label>
              </div>
              <div className="modal-extension p-l-10 p-r-10 p-b-10">

                <input type="radio" id="type-0" name="player-type" className="group" defaultChecked="{true}" />
                <input type="radio" id="type-1" name="player-type" className="group" />

                <div className="radio-group">
                  <label
                    htmlFor="type-0"
                    className="type-0"
                    onClick={() => setType(false)}
                  >
                    개인
                  </label>
                  <label
                    htmlFor="type-1"
                    className="type-1"
                    onClick={() => setType(true)}
                  >
                    법인
                  </label>
                </div>

                <div className="required m-t-20">
                  <input
                    name="name"
                    type="text"
                    placeholder="계약 요청자명"
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
                        placeholder="법인/사업자명"
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
                  onClick={() => setRequester()}
                >
                {
                  state.isCompany ? "법인/단체 요청자 설정" : "개인 요청자 설정"
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
  setRequester: composerActions.setRequester
}

export default connect(
  mapStateToProps,
  actionCreators
)(AddOwner)
