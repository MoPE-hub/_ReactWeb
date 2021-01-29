import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { composerActions } from '../../store/actions'

import { Rnd } from 'react-rnd'
import { toast } from 'react-toastify'
import MousePosition from '../../hook/mouse-position'

const TextBox = props => {

  const { composer, setComponent, deleteComponent, setComponents } = props
  const { x, y } = MousePosition()
  const [ state, setState ] = useState({
    textBoxes: []
  })

  const currentScale = document.getElementsByClassName('pdfAnnotationLayer')[0]

  useEffect(() => {
    if(state.textBoxes.length < composer.isSetTextBox.length) {
      const textBoxes = [...state.textBoxes]
      textBoxes[composer.isSetTextBox.length - 1] = {
        ...textBoxes[composer.isSetTextBox.length - 1],
        width: 259,
        height: 44,
        x: x,
        y: y,
        isPosition: false
      }

      setState({
        textBoxes
      })
    }

  },[composer, state, x, y])

  const handleFontSize = (el) => {
    if (!el) return
    el.style.fontSize = el.getBoundingClientRect().height / 20 + 'rem'
  }

  const handleInit = (e, index) => {
    const target = e.target.parentElement.parentElement.parentElement
    target.remove()
    deleteComponent({
      type: 'DELETE_TEXT_BOX',
      index: index
    })
  }

  const setAppend = (index, d) => {
    const textBoxes = [...state.textBoxes]

    d.node.style.pointerEvents = 'none'
    const target = document.elementFromPoint(x, y)
    const targetPage = target.parentElement.getAttribute('data-page-number')
    d.node.style.pointerEvents = ''

    if(target.className !== 'pdfAnnotationLayer') {
      toast.info('문서내에 지정하세요', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      return
    }

    /***************
      스케일 & 위치보정
    ****************/

    const targetRect = target.getBoundingClientRect()
    const style = window.getComputedStyle(d.node)
    const matrix = new DOMMatrixReadOnly(style.transform)

    const currentX = textBoxes[index].x
    const latestX = textBoxes[index].lastX

    textBoxes[index] = {
      ...textBoxes[index],
      x: (currentX === latestX ? matrix.m41 : matrix.m41 - targetRect.left),
      y: (currentX === latestX ? matrix.m42 : matrix.m42 - targetRect.top + 51),
      lastX: (currentX === latestX ? matrix.m41 : matrix.m41 - targetRect.left),
      lastY: (currentX === latestX ? matrix.m42 : matrix.m42 - targetRect.top + 51),
      targetPage: parseInt(targetPage),
      isPosition: true,
      user: textBoxes[index].user ? textBoxes[index].user : composer.user
    }

    setState({
      textBoxes
    })

    /***************
      이거 잘 안된다.
    ****************/

    // const targetScale = target.getAttribute('data-viewport-scale')
    // const scale = ' scale(' + targetScale + ')'
    //
    // d.node.style.transformOrigin = 'top right'
    // d.node.style.transform += scale

    /***************
      이거 잘 안된다.
    ****************/

    if(!state.textBoxes[index].isPosition) {
      target.appendChild(d.node)
    }

    setComponents({
      type: 'textBoxes',
      value: textBoxes,
      user: textBoxes[index].user ? textBoxes[index].user : composer.user
    })
  }

	return (
    composer.isSetTextBox.length > 0 ? state.textBoxes.map((item, index) => (
      <div
        key={index}
        style={{
          'position': 'absolute',
          'transform' : 'scale(' + parseInt(currentScale ? parseInt(currentScale.getAttribute('data-viewport-scale')) : 1) + ')',
          'zIndex': '99999999999999'
        }}
      >
        <Rnd
          size={{
            width: state.textBoxes[index].width,
            height: state.textBoxes[index].height
          }}
          bounds={'parent'}
          // scale={currentScale ? parseInt(currentScale.getAttribute('data-viewport-scale')) : 1}
          maxWidth={900}
          maxHeight={300}
          minWidth={100}
          minHeight={30}
          position={{
            x: (state.textBoxes[index].isPosition ? state.textBoxes[index].x : x - 252),
            y: (state.textBoxes[index].isPosition ? state.textBoxes[index].y : y - 84),
          }}
          onDragStop={(e, d) => {
            const textBoxes = [...state.textBoxes]
            textBoxes[index] = {
              ...textBoxes[index],
              x: d.x,
              y: d.y,
              lastX: d.lastX,
              lastY: d.lastY,
              user: textBoxes[index].user ? textBoxes[index].user : composer.user
            }

            setState({
              textBoxes
            })

            setAppend(index, d)
          }}
          onResizeStop={(e, direction, ref, delta, position) => {

            const left = ref.getBoundingClientRect().x
            const top = ref.getBoundingClientRect().y

            const textBoxes = [...state.textBoxes]
            textBoxes[index] = {
              ...textBoxes[index],
              width: ref.clientWidth,
              height: ref.clientHeight,
              x: left,
              y: top,
              user: textBoxes[index].user ? textBoxes[index].user : composer.user
            }

            setState({
              textBoxes
            })

            setComponents({
              type: 'textBoxes',
              value: textBoxes,
              user: textBoxes[index].user ? textBoxes[index].user : composer.user
            })
          }}
        >
          <div
            className="drag-component input-text-drag"
          >
            <input
              type="text"
              className="input-drag drag-layer"
              placeholder="텍스트 입력"
              readOnly
              ref={el => handleFontSize(el)}
            />
            <div className="delete-wrap">
              <button
                className="input-delete"
                onClick={(e) => handleInit(e, index)}
              >
                &times;
              </button>
            </div>
            <div className="target-wrap">
              
              <span className="name">
                {state.textBoxes[index].user ? state.textBoxes[index].user.userInfo.name : composer.user.userInfo.name}
              </span>

              <span
                className="color-dot"
                style={{'backgroundColor': '#' + (state.textBoxes[index].user ? state.textBoxes[index].user.userInfo.color : composer.user.userInfo.color)}}
              >
              </span>
            </div>
          </div>
        </Rnd>
      </div>
    )) : null
  )
}

const mapStateToProps = state => {
  return {
    composer: state.composer
  }
}

const actionCreators = {
  setComponent: composerActions.setComponent,
  deleteComponent: composerActions.deleteComponent,
  setComponents: composerActions.setComponents
}

export default connect(
  mapStateToProps,
  actionCreators
)(TextBox)
