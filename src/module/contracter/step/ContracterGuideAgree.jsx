import React, { useState } from 'react'
import Stepper from './Stepper'
import { connect } from 'react-redux'
import { contracterActions } from '../../../store/actions'
import moment from 'moment'

import Input from '../../../module/input'
import Calendar from '../../../module/calendar'

const ContracterGuide = props => {

  const [ state, setState ] = useState({
    type: 'individual',
    generalFile: '',
    pkgFile: '',
    attachFiles: '',
    signCertType: 'A'
  })

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleClear = (item) => {

    const data = state.attachFiles.filter(state => state.name !== item.name)

    setState ({
      ...state,
      attachFiles: data
    })
  }

  const setFile = (e, type) => {
    switch (type) {
      case "agreeFile":
        setState ({
          ...state,
          agreeFile: e.target.files
        })
      break

      case "attachFiles":

        if(e.target.files.length > 5) {
          props.alert({
            title: "안내",
            message: "첨부파일은 5개까지만 가능합니다."
          })
          return
        }

        setState ({
          ...state,
          attachFiles: Array.from(e.target.files)
        })
      break

      default:
        return state
    }
  }

  const handleSubmit = () => {
    props.regis(state)
  }

  return (
    <React.Fragment>
      <div className="modal-body"></div>

      <div className="modal-extension p-t-0 p-l-10 p-r-10 p-b-10">
        <input type="radio" id="slider-1" name="slider" title="slide-1" className="slider-nav" defaultChecked={true} />
        <input type="radio" id="slider-2" name="slider" title="slide-2" className="slider-nav" />
        <input type="radio" id="slider-3" name="slider" title="slide-3" className="slider-nav" />
        <input type="radio" id="slider-4" name="slider" title="slide-4" className="slider-nav" />
        <input type="radio" id="slider-5" name="slider" title="slide-5" className="slider-nav" />
        <input type="radio" id="slider-6" name="slider" title="slide-6" className="slider-nav" />

        <div className="slider">
          <div className="slider-inner agree">
            <div className="slider-contents">
              <h5 className="component light-gray">계약타입을 선택하세요</h5>
              <Stepper />
            </div>

            <div className="slider-contents">
              <h5 className="component light-gray">청약명을 입력하세요</h5>

              <div className="content">

              <Input
                type={"text"}
                id="cntrctSj"
                name="cntrctSj"
                value={state.cntrctSj}
                className="form-control input-text"
                placeholder="계약명"
                message={"계약명을 입력하세요"}
                onChange={(e) => handleChange(e)}
                required={true}
                numberOnly={false}
                flow={"up"}
                submitted={props.submitted}
              />

                <div className="description">
                  사용하실 청약서명을 입력하세요.
                </div>
              </div>
            </div>

            <div className="slider-contents">
              <h5 className="component light-gray">청약서를 업로드하세요</h5>

              <div className="content">
                <div className="input-with-btn">
                  <input
                    type="file"
                    id="agreeFile"
                    name="agreeFile"
                    placeholder="계약서 첨부"
                    className="form-control input input-file"
                    onChange={(e) => setFile(e, 'agreeFile')}
                  />
                  <span className="text">
                    <label htmlFor="agreeFile">
                      {
                        state.agreeFile ? state.agreeFile[0].name : "청약서 첨부"
                      }
                    </label>
                  </span>
                </div>

                <div className="description">
                  청약서 파일을 업로드 합니다.
                  <br />
                  [jpg, jpeg, png, pdf, hwp, doc, docx, xls, xlsx, ppt, pptx, bmp]
                </div>
              </div>
            </div>

            <div className="slider-contents">
              <h5 className="component light-gray">서명완료 기한을 입력하세요</h5>

              <div className="content">

                <Calendar
                  id="cntrctMax"
                  name="cntrctMax"
                  placeHolder={"서명완료 기한"}
                  class={"form-control input"}

                  /***************************************
                  - 밸리데이션 체크
                  flow: left, right, up, down
                  ***************************************/

                  required={true}
                  message={"서명완료 기한을 입력하세요."}
                  flow={"up"}
                  showTime={false}
                  submitted={props.submitted}
                  // onSelect={(value) => setState({
                  //     ...state,
                  //     cntrctMax: moment(value).format('Y-MM-DD')
                  //   })
                  // }
                  onSelect={(value) => handleChange({
                    target: {
                      name: 'cntrctMax',
                      value: moment(value).format('Y-MM-DD')
                    }
                  })}
                  withBtn={true}
                  withBtnName={"서명완료 기한"}

                  /***************************************
                  - 밸리데이션 체크 끝
                  ***************************************/
                />
              </div>
            </div>

            <div className="slider-contents">
              <h5 className="component light-gray">인증서 타입을 선택하세요</h5>
              <div className="content">
                <div className="dis-block p-b-20">
                  <input
                    id="signCertTypeA"
                    name="signCertType"
                    type="radio"
                    className="radio-button"
                    defaultChecked={true}
                    onChange={() => setState({
                      ...state,
                      signCertType: 'A'
                    })}
                  />
                  <label htmlFor="signCertTypeA">
                    공인인증서
                  </label>
                  <input
                    id="signCertTypeB"
                    name="signCertType"
                    type="radio"
                    className="radio-button"
                    onChange={() => setState({
                      ...state,
                      signCertType: 'B'
                    })}
                  />
                  <label htmlFor="signCertTypeB">
                    사설인증서
                  </label>
                </div>
                <div className="description">
                  <span className="text-underline">사설인증서란? </span>
                  <br />
                  KT에서 지체 발급하는 전자서명용 인증서로, 무료로 발급되며 3년간 유효합니다.
                </div>
              </div>
            </div>

            <div className="slider-contents">
              <h5 className="component light-gray">첨부파일 등록</h5>
              <div className="content">
                <div className="flex-sb-c">
                  <div className="file-upload file-info">
                    <label className="btn btn-transparent" htmlFor="fileattr">
                      + 첨부파일등록
                    </label>
                    <input
                      type="file"
                      id="fileattr"
                      multiple="multiple"
                      name="fileattr"
                      className="upload-hidden"
                      onChange={(e) => setFile(e, 'attachFiles')}
                    />
                  </div>
                </div>
                <div className="description">
                  <span className="text-underline">계약에 필요한 기타 파일이 있으면 첨부하세요 (최대 5개)</span>
                  <br />
                  [jpg, jpeg, png, pdf, hwp, doc, docx, xls, xlsx, ppt, pptx, bmp, txt]
                </div>

                {
                  state.attachFiles && state.attachFiles.length ?
                    <div className="file-list" id="fileList">
                      <ul>
                      {
                        state.attachFiles ? state.attachFiles.map((item, index) => (
                          <li key={index}>
                          {
                            item.name
                          }
                          <button className="icon-clear" onClick={() => handleClear(item)}></button>
                          </li>
                        )) : ''
                      }
                      </ul>
                    </div>
                  : ''
                }

              </div>
            </div>
          </div>
        </div>

        <div className="dialog-button flex-c-m">
          <label htmlFor="slider-2" className="slider-control next control-1 btn btn-dark-gray btn-md">다음</label>

          <label htmlFor="slider-1" className="slider-control prev control-2 btn btn-white btn-md m-r-10">뒤로</label>
          <label
            htmlFor="slider-3"
            className={`slider-control next control-2 btn btn-dark-gray btn-md ${!state.cntrctSj ? 'disabled' : ''}`}
          >
            다음
          </label>

          <label htmlFor="slider-2" className="slider-control prev control-3 btn btn-white btn-md m-r-10">뒤로</label>
          <label
            htmlFor="slider-4"
            className={`slider-control next control-3 btn btn-dark-gray btn-md ${!state.agreeFile ? 'disabled' : ''}`}
          >
            다음
          </label>

          <label htmlFor="slider-3" className="slider-control prev control-4 btn btn-white btn-md m-r-10">뒤로</label>
          <label
            htmlFor="slider-5"
            className={`slider-control next control-4 btn btn-dark-gray btn-md ${!state.cntrctMax ? 'disabled' : ''}`}
          >
            다음
          </label>

          <label htmlFor="slider-4" className="slider-control prev control-5 btn btn-white btn-md m-r-10">뒤로</label>
          <label htmlFor="slider-6" className="slider-control next control-5 btn btn-dark-gray btn-md">다음</label>

          <label htmlFor="slider-5" className="slider-control prev control-6 btn btn-white btn-md m-r-10">뒤로</label>
          <label htmlFor=""
            className="slider-control next control-6 btn btn-red btn-md"
            onClick={() => handleSubmit()}
          >
            완료
          </label>
        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    contracter: state.contracter
  }
}

const actionCreators = {
  regis: contracterActions.regis,
  alert: contracterActions.alert
}

export default connect(
  mapStateToProps,
  actionCreators
)(ContracterGuide)
