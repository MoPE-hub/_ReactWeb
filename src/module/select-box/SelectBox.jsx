import React, { useState, useEffect } from 'react'

const SelectBox = props => {

  const { isSelected, value  } = props

  const [ state, setState ] = useState({
    isToggle: false,
    data: props.value,
    isSelect: '',
    editing: false
  })

  const select = (item) => {
    setState({
      ...state,
      isSelect: item.title,
      isToggle: false
    })

    props.onChange(item)
  }

  useEffect(() => {
    const isSelectItem = value.find( item => `${item.value}` === `${isSelected}` ? item.title : '')

    setState({
      ...state,
      isSelect: isSelectItem ? isSelectItem['title'] : ''
    })
  },[isSelected])

  return(
    <div
      className={`select-box develop ${props.className}`}
      tooltip={props.message}
      flow={props.flow}
      flag={
        props.required
        &&
        ((state.isToggle && !state[props.name])
        ||
        (props.submitted && !state[props.name])
        ||
        (props.submitted && !state[props.name] && props.notValid))
        ?
        'show'
        :
        'hidden'
      }
    >

      <label onClick={() => setState({
          ...state,
          isToggle: !state.isToggle
        })}
      >
        {
          state.isSelect ? state.isSelect : props.title
        }
      </label>

      <span className={`icon icon-arrow-down ${state.isToggle ? 'toggle' : ''}`}></span>

      {
        state.isToggle ?
          <ul>
          {
            props.value ? props.value.map((item, index) => (
              <li
                key={index}
                onClick={(e) => select(item)}
              >
                <label>
                  {
                    item.title ? item.title : ''
                  }
                </label>
              </li>
            )) : ''
          }
          </ul>
        : ''
      }
    </div>
  )
}

export default SelectBox
