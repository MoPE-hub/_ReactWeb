import React, { useState } from 'react'
import { createPortal } from 'react-dom'

export const IFrame = ({ children, ...props }) => {

  const [ contentRef, setContentRef ] = useState(null)
  const mountNode = contentRef?.contentWindow?.document.body

  return (
    <iframe
      title={props.title}
      {...props}
      ref={setContentRef}
      style={props.style}
    >
      {
        mountNode &&
        createPortal(
          React.Children.only(children),
          mountNode
        )
      }
    </iframe>
  )
}
