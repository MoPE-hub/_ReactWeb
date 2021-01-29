import React, { useState } from 'react'
import { connect } from 'react-redux'
import { chatActions } from '../../store/actions'

import { Rnd } from 'react-rnd'
import MousePosition from '../../hook/mouse-position'
import ChatContent from './ChatContent'

const ChatPopUp = props => {
  
  const { chat } = props
  const { x, y } = MousePosition()
  const [ state, setState ] = useState({
    x: x,
    y: y,
    width: 360,
    height: window.innerHeight - 70
  })

  return (
    <React.Fragment>
    {
      chat.isOpen ?
        <Rnd
          size={{
            width: state.width,
            height: state.height
          }}
          bounds={'parent'}
          dragHandleClassName={'handle'}
          maxWidth={360}
          maxHeight={1500}
          minWidth={100}
          minHeight={500}
          position={{
            x: state.x ? state.x : window.innerWidth - 370 ,
            y: state.y ? state.y : 60
          }}
          onDragStop={(e, d) => {
            setState({
              ...state,
              x: d.x,
              y: d.y,
              lastX: d.lastX,
              lastY: d.lastY
            })
          }}
          enableResizing={{
            top:true,
            right:false,
            bottom:true,
            left:false,
            topLeft:false,
            topRight:false,
            bottomRight:false,
            bottomLeft:false,
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            setState({
              ...state,
              width: ref.style.width,
              height: ref.style.height,
              x: position.x,
              y: position.y
            })
          }}
        >
          <div className="chat">
            <div className="chat-collapse">
              <ChatContent />
            </div>
          </div>
        </Rnd>
      : ''
    }
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    chat: state.chat
  }
}

const actionCreators = {
  toggle: chatActions.toggle
}

export default connect(
  mapStateToProps,
  actionCreators
)(ChatPopUp)
