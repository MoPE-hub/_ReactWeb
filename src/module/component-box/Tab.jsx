import React, { useState } from 'react'

const Tab = (props) => {

  // console.log('-----TabStart-----')
  // console.log(props);
  // console.log(props.data);
  // console.log(props.data.status.select);
  // console.log(props.data.status.select);
  // console.log(props.data.status.contractStatus);
  // console.log('-----TabEnd-----')

  const [ state, setState ] = useState({
    selected: -1,
    subSelected: -1
  })

  const onSelected = (e, id) => {
    e.preventDefault()

    setState({
      ...state,
      selected: id
    })
    props.onChange(id, 1);
  }

  const onSubSelected = (e, id) => {
    e.preventDefault()

    setState({
      ...state,
      subSelected: id,
    })
    props.onChange(id, 2);
  }

  return(
    <React.Fragment>

      <div className="tab-component">
        <ul>
        <li>
          <a href="./"
            className={`${state.selected === -1 ? 'active' : '' }`} onClick={(e) => onSelected(e, -1)} > { '전체' }
          </a>
        </li>

        {
          props.data.status.select ? props.data.status.select.map((item, index) =>
            <li key={index}>
              <a href="./"
                className={`${state.selected === item.id ? 'active' : '' }`}
                onClick={(e) => onSelected(e, item.id)}> { item.name }
                {
                  item.count>=0 ? <span> {item.count}</span> : ''
                }
              </a>

              {
                item.sub ?
                <ul className="tab-sub">
                  {
                    item.sub.map((subItem, subIndex) =>
                      //<li key={subIndex} className={`${state.selected === item.id ? "active" : "" }`} onClick={(e) => onSelected(e, + subItem.id)}>
                      <li key={subIndex} className={''} onClick={(e) => onSubSelected(e, subItem.id)}>
                        <span className="sub-title">
                        {subItem.name}
                        <span> {subItem.count}</span>
                        </span>
                      </li>
                    )
                  }
                </ul> : ''
              }
            </li>
          ) : ''
        }

        {/* {
          props.data.status ?

          <React.Fragment>
          <li>
            <a href="./"
              className={`${state.selected === 1 ? 'active' : '' }`}
              onClick={(e) => onSelected(e, 1)}> { '전체' }
            </a>
          </li>

          <li>
            <a href="./"
              className={`${state.selected === 2 ? 'active' : '' }`}
              onClick={(e) => onSelected(e, 2)}> { '발송전' }
              {
                <span> {props.data.status['cnt1']}</span>
              }
            </a>
          </li>

          <li>
            <a href="./"
              className={`${state.selected === 3 ? 'active' : '' }`}
              onClick={(e) => onSelected(e, 3)}> { '진행중' }
              {
                <span> {props.data.status['cnt2']}</span>
              }
            </a>

            <ul className="tab-sub">

              <li className={`${state.selected === 3 ? 'active' : '' }`} onClick={(e) => onSelected(e, + 'subItem.id')}>
                <span className="sub-title">
                {'진행'}
                <span> {props.data.status['cnt21']}</span>
                </span>
              </li>

              <li className={`${state.selected === 3 ? 'active' : '' }`} onClick={(e) => onSelected(e, + 'subItem.id')}>
                <span className="sub-title">
                {'만료'}
                <span> {props.data.status['cnt22']}</span>
                </span>
              </li>

              <li className={`${state.selected === 3 ? 'active' : '' }`} onClick={(e) => onSelected(e, + 'subItem.id')}>
                <span className="sub-title">
                {'취소'}
                <span> {props.data.status['cnt23']}</span>
                </span>
              </li>
            </ul>
          </li>

          <li>
            <a href="./"
              className={`${state.selected === 4 ? 'active' : '' }`}
              onClick={(e) => onSelected(e, 1)}> { '완료' }
              {
                <span> {props.data.status['cnt3']}</span>
              }
            </a>
          </li>

          </React.Fragment>

          : ''
        } */}

        </ul>
      </div>
    </React.Fragment>
  )
}

export default Tab
