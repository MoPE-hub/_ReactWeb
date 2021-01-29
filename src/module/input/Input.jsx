import React, { useState } from 'react'

const Input = props => {

  const [ state, setState ] = useState({
    editing: false,
    [props.name]: props.value
  })

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      editing: true
    })
    props.onChange(e)
  }

  const lengthCheck = (input) => {
    if (input.target.value.length > input.target.maxLength) {
      input.target.value = input.target.value.slice(0, input.target.maxLength)
    }
  }

  return(
    <React.Fragment>

      <div className={`input-wrapper ${props.wrapperClassName ? props.wrapperClassName : ''}`}>
        {
          props.title ?

          <label className="input-title">
            {props.title}
            {props.required ? <span className="required">*</span> : ''}
          </label>

          : ''
        }

        <div
          className={`${props.withBtn ? 'input-with-btn' : ''}`}
          tooltip={props.message}
          flow={props.flow}
          /*
          flag={
            (props.required && state.editing && !state[props.name])
            ||
            (props.submitted && !state[props.name])
            ? 'show': 'hidden'
          }
          */
          flag={
            `${
              (props.required && props.submitted && !props.value) ? 'show': 'hidden'
            }`
          }
        >
          <input
            type={props.type}
            id={props.id}
            name={props.name}
            value={state[props.name] ? state[props.name] : props.value}
            className={props.className}
            placeholder={props.placeholder}
            // pattern={props.numberOnly ? '[0-9]*' : ''}
            maxLength={props.length ? props.length : ''}
            onInput={(e) => props.length ? lengthCheck(e) : ''}
            onChange={handleInput}
            readOnly={props.readOnly ? true : false}
          />

          {
            props.withBtn ?
              <span
                className="text"
                onClick={() => props.withBtnClick()}
              >
               {
                 props.withBtnName
               }
              </span>
            : ''
          }
        </div>

        {
          props.message ?
            <div className="input-error">
              <label htmlFor={props.id}>
                {props.errorMessage}
              </label>
            </div>
          : ''
        }

      </div>
    </React.Fragment>
  )
}

export default Input
