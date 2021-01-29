import React, { useState } from 'react'
import { connect } from 'react-redux'
import { commonActions } from '../../store/actions'

const Zip = props => {

  const [ state, setState ] = useState({
    keyword: '',
    confmKey: 'U01TX0FVVEgyMDE5MDcwOTEzMzYzMzEwODg2ODE='
  })

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const selected = (address) => {
    console.log(address)
    props.onChange()
  }

  return(
    <React.Fragment>
    {
      props.isZipOpen ?

        <div className="modal-overlay">
          <div className="modal modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title text-center">
                  우편번호 검색
                </div>
                <button
                  type="button"
                  className="icon-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={props.onChange}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-extension">

                  <div className="input" tooltip="주소검색" flow="left">
                    <input
                      type="text"
                      className="form-control input"
                      placeholder="주소검색"
                      name="keyword"
                      value={state.keyword}
                      onChange={(e)=>handleChange(e)}
                    />
                  </div>

                  <button
                    className="btn btn-turquoise btn-md btn-full m-t-10"
                    onClick={() => props.getZipAddress(state)}
                  >
                    검색
                  </button>

                  <div className="address-list">
                    <ul>

                      {
                        props.zipAddress.juso ? props.zipAddress.juso.map((item, index) => (
                          <li
                            key={index}
                            onClick={() => props.onSelect(item)}
                          >
                            {item.zipNo}
                            <br />
                            지번 - {item.jibunAddr}
                            <br />
                            도로명 - {item.roadAddr}
                          </li>
                        )) : ''
                      }

                    </ul>
                  </div>

                  {
                    props.zipAddress.juso ?
                    <button
                      className="btn btn-red btn-turquoise btn-full"
                      onClick={() => props.getZipAddress()}
                    >
                      다음
                    </button>
                    : ''
                  }

                </div>
              </div>
            </div>
          </div>
        </div>

      : ''
    }

    </React.Fragment>
  )
}

const mapStateToProps = state  => {
  return {
    zipAddress: state.common
  }
}

const actionCreators = {
  getZipAddress: commonActions.getZipAddress,
}

export default connect(
  mapStateToProps,
  actionCreators
)(Zip)
