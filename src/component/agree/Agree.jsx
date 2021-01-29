import React, { useState } from 'react'
import { connect } from 'react-redux'

const Agree = props => {

  const [ state, setState ] = useState({
    checkTerms: false,
    checkPolicy: false
  })

  const handleChange = (e) => {
  const { maxLength, value, name } = e.target
  const [ fieldName, fieldIndex ] = name.split("-")

  if (value.length >= maxLength) {
    if (parseInt(fieldIndex, 10) < 5) {
      const next = document.querySelector(
        `input[name=pin-${parseInt(fieldIndex, 10) + 1}]`
      )
      if (next !== null) {
        next.focus()
      }
    }
    else {
      const button = document.querySelector(`button`)
      button.focus()
    }
  }

  setState({
    ...state,
    [`pin${fieldIndex}`]: value
  })
}

  return (
    <React.Fragment>
      <div className="auth">
        <div className="brand"></div>
        {
          !state.checkTerms || !state.checkPolicy ?

            <React.Fragment>
              <div className="agree">
                <h4 className="m-t-20">이용약관</h4>

                <div className="preview-box">
                  <div className="policy-terms">
                    asdf
                  </div>
                </div>

                <input
                  type="checkbox"
                  id="checkTerms"
                  name="checkTerms"
                  className="checkbox small"
                  checked={state.checkTerms}
                  onChange={() => setState({
                    ...state,
                    checkTerms: !state.checkTerms
                  })}
                  readOnly
                />
                <label
                  htmlFor="checkTerms"
                >
                  동의
                </label>
              </div>

              <div className="agree">
                <h4 className="m-t-20">개인정보처리방침</h4>

                <div className="preview-box">
                  <div className="policy-terms">
                    asdf
                  </div>
                </div>

                <input
                  type="checkbox"
                  id="checkPolicy"
                  name="checkPolicy"
                  className="checkbox small"
                  checked={state.checkPolicy}
                  onChange={() => setState({
                    ...state,
                    checkPolicy: !state.checkPolicy
                  })}
                  readOnly
                />
                <label
                  htmlFor="checkPolicy"
                >
                  동의
                </label>
              </div>
            </React.Fragment>

          :

          <React.Fragment>
            <h4 className="m-t-20">PIN 번호를 입력하세요</h4>

            <div className="pin">
              <ul>
                <li>
                  <input
                    type="tel"
                    name="pin-0"
                    maxLength={1}
                    autofocus="true"
                    onChange={(e) => handleChange(e)}
                  />
                </li>
                <li>
                  <input
                    type="tel"
                    name="pin-1"
                    maxLength={1}
                    onChange={(e) => handleChange(e)}
                  />
                </li>
                <li>
                  <input
                    type="tel"
                    name="pin-2"
                    maxLength={1}
                    onChange={(e) => handleChange(e)}
                  />
                </li>
                <li>
                  <input
                    type="tel"
                    name="pin-3"
                    maxLength={1}
                    onChange={(e) => handleChange(e)}
                  />
                </li>
                <li>
                  <input
                    type="tel"
                    name="pin-4"
                    maxLength={1}
                    onChange={(e) => handleChange(e)}
                  />
                </li>
                <li>
                  <input
                    type="tel"
                    name="pin-5"
                    maxLength={1}
                    onChange={(e) => handleChange(e)}
                  />
                </li>
              </ul>
            </div>

            <button
              className="btn btn-black btn-md m-t-30"
            >
              PIN 등록
            </button>
          </React.Fragment>
        }
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    //
  }
}

const actionCreators = {
  //
}

export default connect(
  mapStateToProps,
  actionCreators
)(Agree)
