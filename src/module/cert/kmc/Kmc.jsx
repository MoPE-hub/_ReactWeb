import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
// import { certificateActions, userActions } from '../../../store/actions'

const Kmc = props => {

  const ref = React.createRef()

  const [ state, setState ] = useState({
    submitted: false,
    completed: false
  })

  const handle = () => {
    window.open('', 'KMCISWindow', 'width=415,height=600')
  }

  useEffect(() => {
    // FIXME: 이부분 분기 처리 제대로 해야함...
    console.log(props)
    // if(props['params'].ci && !props['params'].tr.sEncData && !state.completed && !props.auth.isCert) {
    //   props.setCert(props['params'].ci)
    //
    //   setState({
    //     ...state,
    //     completed: true
    //   })
    //
    // }
    // else if(props['params'].tr.tr_add && !state.submitted) {
    //   ref.current.requestSubmit()
    // }

    if(props['state']) {
      ref.current.requestSubmit()
    }
  }, [props, ref, state, state.submitted])

  return (
    <React.Fragment>

      <form
        id="tranMgr"
        target="KMCISWindow"
        name="KMCISWindow"
        method="post"
        action="https://www.kmcert.com/kmcis/web/kmcisReq.jsp"
        acceptCharset="UTF-8"
        ref={ref}
        onSubmit={() => handle()}
      >
        <input
          type="hidden"
          id="tr_cert"
          name="tr_cert"
          value={props['params'] ? props['params'].tr.tr_cert : ''}
        />

        <input type="hidden"
          id="tr_url"
          name="tr_url"
          value="https://paperless-dev.apwisdom.com"
          // value="https://192.168.1.30:3000"
          // value={props['params'] ? props['params'].tr_uri : ''}
        />

        <input
          type="hidden"
          id="tr_add"
          name="tr_add"
          value={props['params'] ? props['params'].tr.tr_add : ''}
        />
      </form>

    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    // auth: state.auth,
    // certificate: state.certificate
  }
}

const actionCreators = {
  // start: certificateActions.start,
  // setCert: userActions.setCert
}

export default connect(
  mapStateToProps,
  actionCreators
)(Kmc)
