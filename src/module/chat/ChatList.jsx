import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import { chatActions } from '../../store/actions'

const ChatList = props => {

  const { chat, newMessage, load } = props
  const ref = useRef(null)

  const scrollToBottom = () => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    })
  }

  useEffect(() => {
    if (chat.message) {
      scrollToBottom()
    }

    // load()
  }, [])

  return (
    <React.Fragment>
      <div className="inner">
        {
          chat.message ? chat.message.map((item, index) => (
            <div key={index} className={item.id === 1 ? "bubble you" : "bubble me"}>
              {item.id === 1 ? <span className="name"> {item.name} </span> : ""}
              <span className="contents">{item.message}</span>
              <span className="time">{item.time}</span>
            </div>
          ))
          : ''
        }
        {newMessage}
        {chat.isLoading ? 'loading...' : ''}
        <div className="anchor"
          ref={ref}
        >
        </div>
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
  load: chatActions.load
}

export default connect(
  mapStateToProps,
  actionCreators
)(ChatList)
