import 'rc-calendar/assets/index.css'
import React from 'react'
import PropTypes from 'prop-types'
import Calendar from 'rc-calendar'
import DatePicker from 'rc-calendar/lib/Picker'
import koKR from 'rc-calendar/lib/locale/ko_KR'

import 'rc-time-picker/assets/index.css'
import TimePickerPanel from 'rc-time-picker/lib/Panel'

import moment from 'moment'
import 'moment/locale/ko'

import { createGlobalStyle } from 'styled-components'

const format = 'YYYY-MM-DD HH:mm:ss'
const now = moment()


function getFormat(time) {
  return time ? format : 'YYYY-MM-DD'
}

const defaultCalendarValue = now.clone()
defaultCalendarValue.add(-1, 'month')

const timePickerElement = <TimePickerPanel defaultValue={moment('00:00:00', 'HH:mm:ss')} />

function disabledTime(date) {
  if (date && (date.date() === 15)) {
    return {
      disabledHours() {
        return [3, 4]
      },
    }
  }
  return {
    disabledHours() {
      return [1, 2]
    }
  }
}

function disabledDate(current) {
  if (!current) {
    return false
  }
  const date = moment()
  date.hour(0)
  date.minute(0)
  date.second(0)
  return current.valueOf() < date.valueOf()  // can not select days before today
}

class CalendarView extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.object,
    defaultCalendarValue: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.calendarContainerRef = React.createRef()

    this.state = {
      showTime: this.props.showTime,
      showDateInput: true,
      disabled: false,
      open: false,
      editing: true,
      value: props.defaultValue
    }
  }

  onChange = (value) => {

    // console.log('DatePicker change: ', (value && value.format(format)))

    this.setState({
      value
    })

    /**************
     거지 같다...
    **************/

    if(this.props.onSelect) {
      this.props.onSelect(value)
    }
  }

  onClear = (value) => {

    // WARNING: 렌더링 워닝..

    this.setState({
      value
    })
  }

  onShowTimeChange = (e) => {
    this.setState({
      showTime: e.target.checked,
    })
  }

  onShowDateInputChange = (e) => {
    this.setState({
      showDateInput: e.target.checked,
    })
  }

  onOpenChange = (open) => {
    this.setState({
      open,
    })
  }

  onFocus = () => {
    if (!this.state.open && this.state.isMouseDown) {
      this.setState({
        isMouseDown: false
      })
    } else {
      this.setState({
        open: true
      })
    }
  }

  onMouseDown = () => {
    this.setState({
      isMouseDown: true
    })
  }

  getCalendarContainer = () => this.calendarContainerRef.current

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled
    })
  }

  render() {

    const ResetStyle = createGlobalStyle`
      span.rc-calendar-span {
        border: unset !important;
        padding: unset !important;
        font-size: unset !important;
        width: 100%;
      }
    `

    const state = this.state
    const calendar = (<Calendar
      locale={koKR}
      style={{ zIndex: 1001 }}
      dateInputPlaceholder=""
      format={getFormat(state.showTime)}
      disabledTime={state.showTime ? disabledTime : null}
      timePicker={state.showTime ? timePickerElement : null}
      defaultValue={this.props.defaultCalendarValue}
      showDateInput={state.showDateInput}
      disabledDate={disabledDate}
      focusablePanel={false}
    />)
    return (
      <React.Fragment>
      <ResetStyle />

        <DatePicker
          animation="slide-up"
          calendar={calendar}
          value={state.value}
          onChange={this.onChange}
          getCalendarContainer={this.getCalendarContainer}
          onOpenChange={this.onOpenChange}
          open={state.open}
          style={{ zIndex: 1001, position: "fixed" }}
          disabled={this.props.disabled ? this.props.disabled : state.disabled}
          locale={koKR}
        >
          {
            ({ value }) => {

              return (

                <div
                  className={`${this.props.withBtn ? 'input-with-btn m-b-10' : 'm-b-10'}`}
                  tooltip={this.props.message}
                  flow={this.props.flow}
                  flag={(this.props.required && this.props.submitted && !state.isSelected) ? 'show' : 'hidden'}
                >

                  <span
                    className="rc-calendar-span"
                    tabIndex="0"
                    onMouseDown={this.onMouseDown}
                    onFocus={this.onFocus}
                  >
                    <input
                      className={this.props.class ? this.props.class : "form-control"}
                      placeholder={this.props.placeHolder ? this.props.placeHolder : "날짜"}
                      disabled={this.props.disabled ? this.props.disabled : state.disabled}
                      readOnly
                      tabIndex="-1"
                      value={
                        this.props.init ? this.props.init
                        :
                        (value ? value.format(getFormat(this.state.showTime)) : '')
                      }
                      onChange={
                        value && this.props.onClear ?
                          this.onClear()
                        :
                        null
                      }
                    />
                    <div ref={this.calendarContainerRef} />
                  </span>

                  {
                    this.props.withBtn ?

                      <span
                        className="icon-calendar hand"
                      >
                       <i> { this.props.withBtnName } </i>
                      </span>

                    : ''
                  }

                </div>
              )
            }
          }
        </DatePicker>

      </React.Fragment>
    )
  }
}

export default CalendarView
