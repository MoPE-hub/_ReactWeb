import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

/******************************

  - 사용법

  dispatch(alertActions.(success, error, confirm 중 택1)({
    title: '성공',
    message: '정상적으로 등록되었습니다.',

    <--- confirm일 경우 --->
    params: {
      type: 'confirm',
      action: 'canvasActions',
      method: 'open',
      params: params
    }
    <--- confirm일 경우 --->
  }))

******************************/

const Alert = props => {

  const { dispatch } = props

  const handle = (type) => {

    switch(type) {
      case "CONFIRM":

        const data = props.alert.params.params

        // 여기서 한번 멈춘다. then 필요 없음..?
        dispatch(actions[data.action][data.method](data.params))

        return dispatch(actions.alertActions.clear())

      default:
        dispatch(actions.alertActions.clear())
    }
  }

  const renderSwitch = (type) => {
    switch(type) {
      case "SUCCESS":
        return '성공'
      case "ERROR":
        return '오류'
      case "CONFIRM":
        return '확인'
      default:
        return null
    }
  }

  return(
    <React.Fragment>
      {
        props.alert.isShow ?

          <div className="modal-overlay">
            <div className="modal modal">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="modal-title">
                  {
                    props.alert.title ? props.alert.title : renderSwitch(props.alert.type)
                  }
                  </div>
                  <button
                    type="button"
                    className="icon-close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => handle()}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body p-t-10 p-b-10">
                  <div className="modal-description">

                    {
                      props.alert.message ?
                        props.alert.message.split('\n').map((line, index) => {
                          return (
                            <span key={index}>{ line }<br /></span>
                          )
                        })
                      : ''
                    }

                  </div>
                </div>

                <div className="modal-footer">
                  {
                    props.alert.type === "CONFIRM" ?
                      <button
                        type="button"
                        className="btn btn-white btn-sm m-l-5 m-r-5"
                        onClick={() => handle()}
                      >
                        취소
                      </button>
                    : ''
                  }

                  <button
                    type="button"
                    className="btn btn-dark-gray btn-sm m-l-5 m-r-5"
                    onClick={() => handle(props.alert.type)}
                  >
                    확인
                  </button>

                </div>
              </div>
            </div>
          </div>

        : ''
      }
    </React.Fragment>
  )
}

const mapStateToProps = dispatch => {
  return {
    alert: dispatch.alert,
  }
}

export default connect(
  mapStateToProps
)(Alert)
