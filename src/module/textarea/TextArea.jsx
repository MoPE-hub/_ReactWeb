import React, { useState } from 'react'

const TextArea = (props) => {

  const [ state, setState ] = useState({
    editing: false,
    [props.id]: props.value
  })

  const handleInput = (e) => {

    setState({
      ...state,
      [e.target.name]: e.target.value,
      editing: true
    })

    /***********************
      e 를 전부 돌려준다.
    ***********************/

    props.onChange(e)
  }

  return(
    <React.Fragment>

      <div
        className="m-b-10"
        tooltip={props.message}
        flow={props.flow}
        flag={(props.required && state.editing && !state[props.name]) || (props.submitted && !state[props.name]) ? 'show': 'hidden'}
      >
        <textarea
          className="form-control input-textarea"
          name={props.name}
          id={props.id}
          value={state[props.id]}
          onChange={(e) => handleInput(e)}
          rows={props.row}
          placeholder={props.placeholder}
        >
        </textarea>
      </div>

    </React.Fragment>
  )
}

export default TextArea
