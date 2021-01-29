import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import Search from './Search'
import Tab from './Tab'
import SelectBox from './SelectBox'
import Calendar from './Calendar'

const ComponentBox = props => {

  const { selectBoxItems } = props

  return(
    <React.Fragment>

      <div className="component-box">
        <input type="checkbox" id="component-box" />

        <label
          className="component-box-anchor"
          htmlFor="component-box"
        >
          <span className="icon icon-arrow-down"></span>
        </label>

        <ul className="component-list">
          <li className="component-li">
            {
              props.contract ?
              <Tab
                onChange={ props.onSelectTab }
                data={ props.contract }
              />
              : ''
            }
          </li>

            <li className="component-li">

              <SelectBox
                title={'전체'}
                value={ selectBoxItems }
                onChange={(value) =>
                  props.onChange({
                    'title': 'searchDateType',
                    'value': value
                  })
                }
              />

            </li>
            <li className="component-li">

              <Search
                onChange={(value) =>
                  props.onChange({
                    'title': 'keyword',
                    'value': value
                  })
                }
              />

            </li>

          <li className="component-li">
            <Calendar
              onSelect={(value) =>
                props.onChange({
                  'title': 'from',
                  'value': value ? moment(value).format('Y-MM-DD') : ''
                })
              }
            />
          </li>

          <span className="divider m-r-10">~</span>

          <li className="component-li">
            <Calendar
              onSelect={(value) =>
                props.onChange({
                  'title': 'to',
                  'value': value ? moment(value).format('Y-MM-DD') : ''
                })
              }
            />
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state  => {
  return {
    contract: state.contract
  }
}

const actionCreators = {
}

export default connect(
  mapStateToProps,
  actionCreators
)(ComponentBox)
