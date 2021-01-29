import React, { useState } from 'react'

const Files = (props) => {

  const [ state, setState ] = useState({
    editing: false,
  })

  const setFile = (e, type) => {
    setState ({
      ...state,
      [type + 'name']: e.target.files[0].name,
      [type]: e.target.files[0]
    })
  }

  return(
    <React.Fragment>

      <div
        className="input-with-btn m-b-10"
        tooltip={props.message}
        flow={props.flow}
        flag={(props.required && state.editing && !state[props.name]) || (props.submitted && !state[props.name]) ? 'show': 'hidden'}
      >

        <input
          type="file"
          id={props.name}
          name={props.name}
          placeholder={props.placeholder}
          className="form-control input input-file"
          accept={props.accept}
          onChange={(e) => setFile(e, props.name)}
        />

        <span className="text">
          <label htmlFor={props.name}>
            {
              state[props.name + 'name'] ? state[props.name + 'name'] : props.placeholder
            }
          </label>
        </span>

      </div>

    </React.Fragment>
  )
}

export default Files
