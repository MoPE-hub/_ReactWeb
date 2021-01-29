import React, { useState } from 'react'
import { connect } from 'react-redux'

import { chatActions } from '../../store/actions'
import ChatList from './ChatList'

const ChatPopUp = props => {

  const { send } = props
  const [ state, setState ] = useState({
    disabled: true,
    message: [],
    newMessage: ''
  })

  /**************
    입력상태
  ***************/

  const handleChagne = (e) => {
    const content = e.target.value

    setState({
      disabled: (content.length? false : true),
      message: state.message,
      newMessage: content
    })
  }

  /**************
    메시지 전달
  ***************/

  const onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data =  (
      <div key={state.message.length + 1} className="bubble me">
        <span className="contents">{state.newMessage}</span>
        <span className="time">지금</span>
      </div>
    )

    setState({
      disabled: true,
      message: state.message.concat(data),
      newMessage: ''
    })

    send(state.newMessage)
  }

  return (
    <React.Fragment>
      <div className="chat-content">
        <div className="chat-header handle">
          <span className="title handle">
            생성된 계약명
          </span>
          <label
            htmlFor=""
            onClick={() => props.toggle('TOGGLE_POPUP')}
          >
            &times;
          </label>
        </div>

        <div className="people">
          <ul>
            <li>
              <span className="char"></span>
              <span className="name">나다미누</span>
            </li>
            <li>
              <span className="char"></span>
              <span className="name">옥성은</span>
            </li>
            <li>
              <span className="char"></span>
              <span className="name">강민아</span>
            </li>
            <li>
              <span className="char"></span>
              <span className="name">정성립</span>
            </li>
            <li>
              <span className="char"></span>
              <span className="name">캡틴</span>
            </li>
            <li>
              <span className="char"></span>
              <span className="name">나다미누</span>
            </li>
            <li>
              <span className="char"></span>
              <span className="name">옥성은</span>
            </li>
            <li>
              <span className="char"></span>
              <span className="name">강민아</span>
            </li>
            <li>
              <span className="char"></span>
              <span className="name">정성립</span>
            </li>
            <li>
              <span className="char"></span>
              <span className="name">캡틴</span>
            </li>
          </ul>
        </div>

        <div className="info">
          참여자 5명
        </div>

        <div className="chat-body">
          <ChatList
            newMessage={state.message}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="chat-input">
            <textarea
              placeholder="내용을 입력하세요"
              value={state.newMessage}
              onChange={handleChagne}
              onKeyDown={onEnterPress}
            >
            </textarea>
            <button
              className="btn btn-red btn-md"
              disabled = {state.disabled}
            >
              전송
            </button>
          </div>
        </form>

      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    chat: state.chat
  }
}

const actionCreators = {
  load: chatActions.load,
  send: chatActions.send,
  toggle: chatActions.toggle
}

export default connect(
  mapStateToProps,
  actionCreators
)(ChatPopUp)
