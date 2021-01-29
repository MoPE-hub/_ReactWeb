import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { certificateActions, userActions } from '../../../store/actions'

const Ipin = props => {

  const ref = React.createRef()

  const [state, setState] = useState({
    submitted: false,
    completed: false
  })

  const handle = () => {
    window.open('', 'popupIPIN2', 'width=450,height=550')
  }

  useEffect(() => {
    // FIXME: 이부분 분기 처리 제대로 해야함...
    if(props['params'].ci && props['params'].tr.sEncData && !state.completed && !props.auth.isCert) {
      props.setIpinCert(props['params'].ci)

      setState({
        ...state,
        completed: true
      })
    }
    else if(props['params'].tr.sEncData && !state.submitted) {
      ref.current.requestSubmit()
    }

  }, [props, ref, state, state.submitted])

  return (
    <React.Fragment>

      <form
        id="IPINPopUp"
        target="popupIPIN2"
        name="IPINPopUp"
        method="post"
        action="https://cert.vno.co.kr/ipin.cb"
        acceptCharset="UTF-8"
        ref={ref}
        onSubmit={() => handle()}
      >
        <input
          type="hidden"
          id="m"
          name="m"
          value={"pubmain"}
        />
        <input
          type="hidden"
          id="viewAddr"
          name="viewAddr"
          value={"certUser"}
        />

        <input
          type="hidden"
          id="enc_data"
          name="enc_data"
          defaultValue={props['params'] ? props['params'].tr.sEncData : ''}
        />
      </form>

    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    certificate: state.certificate
  }
}

const actionCreators = {
  start: certificateActions.start,
  setIpinCert: userActions.setIpinCert
}

export default connect(
  mapStateToProps,
  actionCreators
)(Ipin)
