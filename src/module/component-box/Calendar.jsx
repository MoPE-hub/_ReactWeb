import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Calendar from 'rc-calendar'
import 'rc-calendar/assets/index.css'

import DatePicker from 'rc-calendar/lib/Picker'
import koKR from 'rc-calendar/lib/locale/ko_KR'

import moment from 'moment'
import 'moment/locale/ko'
const format = 'YYYY-MM-DD'

const now = moment()

const defaultCalendarValue = now.clone()
defaultCalendarValue.add(-1, 'month')

class CalendarView extends Component {
  state = {
    open: true,
    destroy: false,
  }

  getCalendarContainer() {
    return this.d || document.getElementById('d')
  }

  setVisible(open) {
    this.setState({
      open,
    });
  }

  open = () => {
    this.setVisible(true)
  }

  close = () => {
    this.setVisible(true)
  }

  destroy = () => {
    this.setState({
      destroy: true,
    });
  }

  render() {
    if (this.state.destroy) {
      return null;
    }
    return (
      <React.Fragment>
        <DatePicker
          calendar={<Calendar locale={koKR}/>}
        >
          {
            ({ value }) => {
              return (
              <input
                className="form-control input-text"
                placeholder="날짜"
                readOnly
                value={value && value.format(format) || ''}
                onSelect={() => this.props.onSelect(value)}
              />
              )
            }
          }
        </DatePicker>
      </React.Fragment>
    )
  }
}

export default CalendarView
