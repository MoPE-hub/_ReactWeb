import React, { useState } from 'react'

const SelectBox = (props) => {

  // const isSelectTitle = props.value.find(elem => elem.value === props.select) ? props.value.find(elem => elem.value === props.select).title:'' ;

  const [ state, setState ] = useState({
    isToggle: false,
    data: props.value,
    // isSelect: isSelectTitle
  })

  const select = (item) => {
    setState({
      ...state,
      isSelect: item.title,
      isToggle: false,
    })
    props.onChange(item.value)
  }

  return(
    <React.Fragment>
      <div className="select-box develop">
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
              props.value.map((item, index) => (
                <li key={index} onClick={() => select(item)}>
                  <label>{item.title ? item.title : '모지?'}</label>
                </li>
              ))
            }
            </ul>
          : ''
        }

      </div>
    </React.Fragment>
  )
}

export default SelectBox
