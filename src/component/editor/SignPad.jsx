import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { composerActions } from '../../store/actions'

import { Rnd } from 'react-rnd'
import { toast } from 'react-toastify'
import MousePosition from '../../hook/mouse-position'

const SignPad = props => {

  const { composer, setComponents } = props
  const { x, y } = MousePosition()
  const [ state, setState ] = useState({
    signPads: []
  })

  useEffect(() => {
    if(state.signPads.length < composer.isSetSignPad.length) {
      const signPads = [...state.signPads]
      signPads[composer.isSetSignPad.length - 1] = {
        ...signPads[composer.isSetSignPad.length - 1],
        width: 150,
        height: 90,
        x: x,
        y: y,
        isPosition: false
      }

      setState({
        signPads
      })
    }

  },[composer, state, x, y])

  const handleInit = (e, index) => {
    const target = e.target.parentElement.parentElement.parentElement
    target.remove()
  }

  const setAppend = (index, d) => {
    const signPads = [...state.signPads]

    d.node.style.pointerEvents = 'none'
    const target = document.elementFromPoint(x, y)
    const targetPage = target.parentElement.getAttribute('data-page-number')
    d.node.style.pointerEvents = ''

    if(target.className !== 'pdfAnnotationLayer') {
      toast.info('문서내에 지정하세요', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      return
    }

    /***************
      위치보정
    ****************/

    const targetRect = target.getBoundingClientRect()
    const style = window.getComputedStyle(d.node)
    const matrix = new DOMMatrixReadOnly(style.transform)

    const currentX = signPads[index].x
    const latestX = signPads[index].lastX

    signPads[index] = {
      ...signPads[index],
      x: (currentX === latestX ? matrix.m41 : matrix.m41 - targetRect.left),
      y: (currentX === latestX ? matrix.m42 : matrix.m42 - targetRect.top + 51),
      lastX: (currentX === latestX ? matrix.m41 : matrix.m41 - targetRect.left),
      lastY: (currentX === latestX ? matrix.m42 : matrix.m42 - targetRect.top + 51),
      targetPage: parseInt(targetPage),
      isPosition: true,
      user: signPads[index].user ? signPads[index].user : composer.user
    }

    setState({
      signPads
    })

    if(!state.signPads[index].isPosition) {
      target.appendChild(d.node)
    }

    setComponents({
      type: 'signPads',
      value: signPads,
      user: signPads[index].user ? signPads[index].user : composer.user
    })
  }

  return (
    composer.isSetSignPad.length > 0 ? state.signPads.map((item, index) => (
      <div
        key={index}
        style={{
          'position': 'absolute'
        }}
      >
        <Rnd
          size={{
            width: state.signPads[index].width,
            height: state.signPads[index].height
          }}
          bounds={'parent'}
          maxWidth={900}
          maxHeight={300}
          minWidth={100}
          minHeight={30}
          position={{
            x: (state.signPads[index].isPosition ? state.signPads[index].x : x - 142),
            y: (state.signPads[index].isPosition ? state.signPads[index].y : y - 132),
          }}
          onDragStop={(e, d) => {
            const signPads = [...state.signPads]
            signPads[index] = {
              ...signPads[index],
              x: d.x,
              y: d.y,
              lastX: d.lastX,
              lastY: d.lastY,
              user: signPads[index].user ? signPads[index].user : composer.user
            }

            setState({
              signPads
            })

            setAppend(index, d)
          }}
          enableResizing={{
            top:true,
            right:true,
            bottom:true,
            left:true,
            topLeft:true,
            topRight:true,
            bottomRight:true,
            bottomLeft:true,
            opLeft:true
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            const signPads = [...state.signPads]
            signPads[index] = {
              ...signPads[index],
              width: ref.clientWidth,
              height: ref.clientHeight,
              x: position.x,
              y: position.y,
              user: signPads[index].user ? signPads[index].user : composer.user
            }

            setState({
              signPads
            })

            setComponents({
              type: 'signPads',
              value: signPads,
              user: signPads[index].user ? signPads[index].user : composer.user
            })
          }}
        >
          <div
            className="drag-component input-sign-pad-drag"
          >
            <div
              className="input-drag drag-layer"
              readOnly
            >
              <span>전자서명 패드</span>
            </div>
            <div className="delete-wrap">
              <button
                className="input-delete"
                onClick={(e, index) => handleInit(e, index)}
                >
                  &times;
              </button>
            </div>
            <div className="target-wrap">
              {/*
              <span className="name">
                {state.signPads[index].user ? state.signPads[index].user.userInfo.name : composer.user.userInfo.name}
              </span>
              */}
              <span
                className="color-dot"
                style={{'backgroundColor': '#' + (state.signPads[index].user ? state.signPads[index].user.userInfo.color : composer.user.userInfo.color)}}
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
  setComponents: composerActions.setComponents
}

export default connect(
  mapStateToProps,
  actionCreators
)(SignPad)
