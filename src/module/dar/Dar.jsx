import React from 'react'
import ReactDOM from 'react-dom'

const Dar = ({
  props,
  position,
  size,
  key,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  onDragStop,
  onResizeStop,
  bounds,
  scale,
  children
}) => {

  const element = <div
                    className='draggableElement'
                    style={{
                      'maxWidth': maxWidth,
                      'maxHeight': maxHeight,
                      'minwidth': minWidth,
                      'minHeight': minHeight,
                      'position': 'absolute',
                      'left': position.x,
                      'top': position.y,
                      'width': size.width,
                      'height': size.height,
                      'transformOrigin': 'left top',
                      'transform': (scale ? 'scale(' + scale + ')' : ''),
                      'zIndex': 999999
                    }}
                  >
                    {children}
                    <div className="resizeableElement">
                      <div
                        className=""
                        style={{position: "absolute", "userSelect": "none", "width": "100%", "height": "10px", "top": "-5px", "left": "0px", "cursor": "row-resize"}}
                      ></div>
                      <div
                        className=""
                        style={{position: "absolute", "userSelect": "none", "width": "10px", "height": "100%", "top": "0px", "right": "-5px", "cursor": "col-resize"}}
                      ></div>
                      <div
                        className=""
                        style={{position: "absolute", "userSelect": "none", "width": "100%", "height": "10px", "bottom": "-5px", "left": "0px", "cursor": "row-resize"}}
                      ></div>
                      <div
                        className=""
                        style={{position: "absolute", "userSelect": "none", "width": "10px", "height": "100%", "top": "0px", "left": "-5px", "cursor": "col-resize"}}
                      ></div>
                      <div
                        className=""
                        style={{position: "absolute", "userSelect": "none", "width": "20px", "height": "20px", "left": "-10px", "top": "-10px", "cursor": "nw-resize"}}
                      ></div>
                      <div
                        className=""
                        style={{position: "absolute", "userSelect": "none", "width": "20px", "height": "20px", "right": "-10px", "top": "-10px", "cursor": "ne-resize"}}
                      ></div>
                      <div
                        className=""
                        style={{position: "absolute", "userSelect": "none", "width": "20px", "height": "20px", "right": "-10px", "bottom": "-10px", "cursor": "se-resize"}}
                      ></div>
                      <div
                        className=""
                        style={{position: "absolute", "userSelect": "none", "width": "20px", "height": "20px", "left": "-10px", "bottom": "-10px", "cursor": "sw-resize"}}
                      ></div>
                      <div
                        className=""
                        style={{position: "absolute", "userSelect": "none"}}
                      ></div>
                    </div>
                  </div>

    /*****************
      드래그
    *****************/

    const dragElement = (element) => {

      var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0

      if(!element) return

      element.onmousedown = dragMouseDown

      function dragMouseDown(e) {
        e = e || window.event
        e.preventDefault()

        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        document.onmousemove = elementDrag
      }

      const elementDrag = (e) => {
        e = e || window.event
        e.preventDefault()

        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY

        // 부모르 불러온다..
        const container = document.getElementsByClassName('pdfAnnotationLayer')[0]
        const containerRect = container.getBoundingClientRect()
        const elementRect = element.getBoundingClientRect()

        // 위...
        if (element.offsetTop - pos2 < container.offsetTop) {
          element.style.top = container.offsetTop + 'px'
        }

        // 아래..
        else if (element.offsetTop - pos2 > container.offsetTop + containerRect.height - elementRect.height) {
          element.style.top = (container.offsetTop + containerRect.height - elementRect.height) + 'px'
        }
        else {
          element.style.top = (element.offsetTop - pos2) + 'px'
        }

        // 왼쪽...
        if (element.offsetLeft - pos1 < container.offsetLeft) {
          element.style.left = container.offsetLeft + 'px'
        }

        // 오른쪽..
        else if (elementRect.x - pos1 > containerRect.x + containerRect.width - elementRect.width) {
          element.style.left = (container.offsetLeft + containerRect.width - elementRect.width) + 'px'
        }
        else {
          element.style.left = (element.offsetLeft - pos1) + 'px'
        }

      }

      const closeDragElement = (e) => {

        const container = document.getElementsByClassName('pdfAnnotationLayer')[0]
        const containerRect = container.getBoundingClientRect()

        onDragStop(e, {
          node: element,
          x: (element.offsetLeft - pos1),
          y: (element.offsetTop - pos2) - containerRect.top + 51
        })

        document.onmouseup = null
        document.onmousemove = null
      }
    }

    /*****************
      리사이즈
    *****************/

    const resizeElement = (element) => {

      var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0

      if(!element) return

      element.onmousedown = resizeMouseDown

      function resizeMouseDown(e) {
        e = e || window.event
        e.preventDefault()

        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeResizeElement
        document.onmousemove = elementResize
      }

      const elementResize = (e) => {
        e = e || window.event
        e.preventDefault()

        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY

        // 부모르 불러온다..
        const container = document.getElementsByClassName('pdfAnnotationLayer')[0]
        const containerRect = container.getBoundingClientRect()
        const elementRect = element.getBoundingClientRect()

        // 위...
        if (element.offsetTop - pos2 < container.offsetTop) {
          element.style.top = '100px'
        }

      }

      const closeResizeElement = (e) => {

        const container = document.getElementsByClassName('pdfAnnotationLayer')[0]
        const containerRect = container.getBoundingClientRect()

        onResizeStop(e, {
          node: element,
          x: (element.offsetLeft - pos1),
          y: (element.offsetTop - pos2) - containerRect.top + 51
        })

        document.onmouseup = null
        document.onmousemove = null
      }
    }

  const targetElement = document.getElementsByClassName('draggableElement')[0]

  dragElement(targetElement)

  if (targetElement) {
    resizeElement(targetElement.getElementsByClassName('resizeableElement')[0])
  }

  return (
    <React.Fragment>
      {element}
    </React.Fragment>
  )
}

export default Dar
