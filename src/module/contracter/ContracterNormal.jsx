import React, { useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { contracterActions } from '../../store/actions'

import Calendar from '../../module/calendar'
import Input from '../../module/input'

const ContracterNormal = props => {

  const [ state, setState ] = useState({
    type: 'individual',
    signCertType: 'A'
  })

  const handleType = (type) => {
    setState({
      ...state,
      type: type
    })
  }

  const handleClear = (item) => {

    const data = state.attachFiles.filter(state => state.name !== item.name)

    setState ({
      ...state,
      attachFiles: data
    })
  }

  const handleDownload = (filePath) => {
    window.location.href=filePath
  }

  const setFile = (e, type) => {
    switch (type) {
      case "generalFile":
        setState ({
          ...state,
          generalFile: e.target.files
        })
      break

      case "pkgFile":
        setState ({
          ...state,
          pkgFile: e.target.files
        })
      break

      case "agreeFile":
        setState ({
          ...state,
          agreeFile: e.target.files
        })
      break

      case "attachFiles":

        if(e.target.files.length > 5) {
          props.alert({
            type: "error",
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

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    props.regis(state)
  }

  return (
    <React.Fragment>
      <div className="modal-body">
        <div className="modal-description">계약서 업로드하세요</div>
      </div>

      <div className="modal-extension p-t-10 p-l-10 p-r-10 p-b-10">
        <div className="radio-group m-b-10">
          <input
            type="radio"
            id="individual"
            name="selector"
            defaultChecked={true}
            onChange={() => handleType('individual')}
          />
          <label htmlFor="individual">
            일반계약
            <span tooltip="일반적인 1:1 또는 1:N 계약형태로 계약서 및 계약 참여자를 직접 입력하여 계약서를 생성합니다." flow="up" ext="force"></span>
          </label>

          <input
            type="radio"
            id="chkPkg"
            name="selector"
            onChange={() => handleType('chkPkg')}
          />
          <label htmlFor="chkPkg">
            일괄계약
            <span tooltip="동일한 서식으로 다수의 계약 체결 시,계약 상대방의 정보를 엑셀파일로 일괄 업로드하면 여러 건의 계약서가 자동으로 생성됩니다." flow="up" ext="force"></span>
          </label>

          <input
            type="radio"
            id="chkAgr"
            name="selector"
            onChange={() => handleType('chkAgr')}
          />
          <label htmlFor="chkAgr">
            청약서
            <span tooltip="요청자의 서명 없이 참여자의 정보입력 및 서명이 필요한 청약서를 생성합니다." flow="up" ext="force"></span>
          </label>
        </div>

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
          flow={"bottom"}
          submitted={props.submitted}
        />

        {/*********
          일반계약
        *********/}

        {
          state.type === 'individual' || state.type === 'chkPkg' ?
          <div className="input-with-btn m-b-10">
            <input
              type="file"
              id="generalFile"
              name="generalFile"
              placeholder="계약서 첨부"
              className="form-control input input-file"
              onChange={(e) => setFile(e, 'generalFile')}
            />
            <span className="text">
              <label htmlFor="generalFile">
                {
                  state.generalFile ? state.generalFile[0].name : "계약서 첨부"
                }
              </label>
            </span>
          </div>
          : ''
        }

        {/*********
          일괄계약
        *********/}

        {
          state.type === 'chkPkg' ?
          <div className="input-with-btn m-b-10">
            <input
              type="file"
              id="pkgFile"
              name="pkgFile"
              placeholder="탬플릿 첨부"
              className="form-control input input-file"
              onChange={(e) => setFile(e, 'pkgFile')}
            />
            <span className="text">
              <label htmlFor="pkgFile">
                {
                  state.pkgFile ? state.pkgFile[0].name : "탬플릿 첨부"
                }
              </label>
            </span>
          </div>
          : ''
        }

        {/*********
          청약서
        *********/}

        {
          state.type === 'chkAgr' ?
          <div className="input-with-btn m-b-10">
            <input
              type="file"
              id="agreeFile"
              name="agreeFile"
              placeholder="청약서 첨부"
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
          : ''
        }

        {
          state.type === 'chkPkg' ?
            <div
              className="m-b-10 text-right hand"
              onClick={() => handleDownload('./files/pkgTemplate.xlsx')}
            >
              <span className="text-underline">일괄계약 템플릿 다운로드</span>
            </div>
          : ''
        }

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

        <div className="flex-sb-m m-b-10">
          <div className="dis-block">
            <input
              type="radio"
              id="signCertTypeA"
              className="radio-button"
              value="A"
              name="signCertType"
              defaultChecked={true}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="signCertTypeA" className="m-r-30">
              공인인증서
              <span tooltip="요청자의 서명 없이 참여자의 정보입력 및 서명이 필요한 청약서를 생성합니다." flow="up" ext="force"></span>
            </label>

            <input
              type="radio"
              id="signCertTypeB"
              className="radio-button"
              value="B"
              name="signCertType"
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="signCertTypeB" className="m-r-30">
              사설인증서
              <span tooltip="요청자의 서명 없이 참여자의 정보입력 및 서명이 필요한 청약서를 생성합니다." flow="up" ext="force"></span>
            </label>
          </div>

          <div className="file-upload file-info">
            <input
              type="file"
              id="fileattr"
              multiple="multiple"
              name="fileattr"
              className="upload-hidden"
              onChange={(e) => setFile(e, 'attachFiles')}
            />
            <label className="btn btn-transparent" htmlFor="fileattr">
              + 첨부파일등록
            </label>
          </div>
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

        <div className="modal-footer text-center">
          <button
            className="btn btn-red btn-md"
            type="submit"
            disabled = {
              state.cntrctSj
              && (state.generalFile || state.agreeFile || state.pkgFile)
              && state.cntrctMax
              ? false
              :
              true
            }
            onClick={() => handleSubmit()}
          >
            업로드
          </button>
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
)(ContracterNormal)
