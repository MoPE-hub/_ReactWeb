import React, { useState } from 'react'
import { connect } from 'react-redux'
import { composerActions, inputActions } from '../../store/actions'
import { toast } from 'react-toastify'
import xlsx from 'xlsx'

import Input from '../../module/input'
import BatchAddColumns from './BatchAddColumns'

const BatchRegis = (props) => {

  const [ state, setState ] = useState({
      title: '',
      submitted: false,
      type: 0
  })

  const handleChange = (e) => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16)

    setState({
      ...state,
      [e.target.name]: e.target.value,
      color: randomColor
    })
  }

  const handleCategory = (e) => {
    setState({
      title: e.target.value
    })
  }

  const clear = () => {
    setState("")
  }

  const handleSubmit = (e) => {

    setState({
      ...state,
      title: '',
      submitted: true
    })

    if(state.title !== '') {
      props.regisCategory({
        title: state.title,
        auth: props.auth['user']
      }).then(
        clear()
      )
    }
  }

  const handleDownload = (filePath) => {
    window.location.href=filePath
  }

  const getXlsxData = (file) => {
    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString

    reader.onload = e => {
      const bstr = e.target.result
      const wb = xlsx.read(bstr, { type: rABS ? "binary" : "array" })

      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      const data = xlsx.utils.sheet_to_json(ws, { header: 1 })

      setUsers(data)
      adds(data)
      setExtensions(data)
    }

    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)
  }

  const setFile = (e) => {

    setState({
      ...state,
      xlsxFile: e.target.files
    })

    getXlsxData(e.target.files[0])
  }

  const setUsers = (data) => {
    props.setUsers(data)
  }

  const adds = (data) => {
    props.adds(data)
  }

  const setExtensions = (data) => {
    props.setExtensions(data)
  }

  const setUser = () => {
    if(!state.isCompany && (!state.name || !state.phone)) {
      toast.info('추가할 대상자의 정보를 입력하세요.', {
        position: "top-center",
        autoClose: 2000,
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
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }

    props.setUser(state)

    setState({
      type: 0
    })
  }

  return(
    <React.Fragment>
      <div className="radio-group m-b-10">
        <input
          type="radio"
          id="regisUser"
          name="selector"
          defaultChecked={true}
          onChange={() => setState({
            ...state,
            type: 0
          })}
        />
        <label htmlFor="regisUser">
          개인
        </label>

        <input
          type="radio"
          id="regisCompany"
          name="selector"
          defaultChecked={false}
          onChange={() => setState({
            ...state,
            type: 1
          })}
        />
        <label htmlFor="regisCompany">
          법인
        </label>

        <input
          type="radio"
          id="regisTemplate"
          name="selector"
          defaultChecked={false}
          onChange={() => setState({
            ...state,
            type: 2
          })}
        />
        <label htmlFor="regisTemplate">
          엑셀로
        </label>
      </div>

      {
        state.type === 0 || state.type === 1 ?
          <React.Fragment>
            <div className="required m-t-10">
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
              {
                state.type === 1 ?
                  <React.Fragment>
                    <input
                      name="companyName"
                      type="companyName"
                      placeholder="법인명"
                      className="form-control input-text m-b-10"
                      value={state.companyName ? state.companyName : ''}
                      onChange={(e) => handleChange(e)}
                    />
                    <input
                      name="companyNumber"
                      type="companyNumber"
                      className="form-control input-text m-b-10 imeEngMode"
                      placeholder="법인번호"
                      value={state.companyNumber ? state.companyNumber : ''}
                      onChange={(e) => handleChange(e)}
                    />
                  </React.Fragment>
                : ''
              }
            </div>
          </React.Fragment>
        : ''
      }

      {
        state.type === 2 ?
          <div className="required m-t-10">
            <div className="input-with-btn m-b-10">
              <input
                type="file"
                id="pkgFile"
                name="pkgFile"
                placeholder="탬플릿 첨부"
                className="form-control input input-file"
                accept=".xlsx,.xls"
                onChange={(e) => setFile(e, 'xlsx')}
              />
              <span className="text">
                <label htmlFor="pkgFile">
                  {
                    state.xlsxFile ? state.xlsxFile[0].name : "템플릿 찾아보기"
                  }
                </label>
              </span>
            </div>

            <div
              className="m-b-10 text-right hand"
              onClick={() => handleDownload('./files/pkgTemplate.xlsx')}
            >
              <span className="text-underline">일괄계약 템플릿 다운로드</span>
            </div>
          </div>
        : ''
      }

      {
        state.type !== 2 ?
          <button
            type="button"
            className="btn btn-md btn-full btn-dark-gray"
            onClick={() => setUser()}
          >
            추가
          </button>
        : ''
      }

      <BatchAddColumns />

    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    composer: state.composer
  }
}

const actionCreators = {
  adds: inputActions.adds,
  setUser: composerActions.setUser,
  setUsers: composerActions.setUsers,
  setExtensions: composerActions.setExtensions,
}

export default connect(
  mapStateToProps,
  actionCreators
)(BatchRegis)
