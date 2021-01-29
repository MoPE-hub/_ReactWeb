import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { composerActions } from '../../store/actions'

import { Rnd } from 'react-rnd'
import { toast } from 'react-toastify'
import MousePosition from '../../hook/mouse-position'

const Sign = props => {

  const { composer, deleteComponent, setComponents } = props
  const { x, y } = MousePosition()
  const [ state, setState ] = useState({
    signs: []
  })

  useEffect(() => {
    if(state.signs.length < composer.isSetSign.length) {
      const signs = [...state.signs]
      signs[composer.isSetSign.length - 1] = {
        ...signs[composer.isSetSign.length - 1],
        width: 80,
        height: 80,
        x: x,
        y: y,
        isPosition: false
      }

      setState({
        signs
      })
    }

  },[composer, state, x, y])

  const handleInit = (e, index) => {
    const target = e.target.parentElement.parentElement.parentElement
    target.remove()
    console.log(index)
    deleteComponent({
      type: 'DELETE_SIGN',
      index: index
    })
  }

  /**************
    pdf 어노테이션 달기
  ***************/

  const setAppend = (index, d) => {

    const signs = [...state.signs]

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

    const currentX = signs[index].x
    const latestX = signs[index].lastX

    signs[index] = {
      ...signs[index],
      x: (currentX === latestX ? matrix.m41 : matrix.m41 - targetRect.left),
      y: (currentX === latestX ? matrix.m42 : matrix.m42 - targetRect.top + 51),
      lastX: (currentX === latestX ? matrix.m41 : matrix.m41 - targetRect.left),
      lastY: (currentX === latestX ? matrix.m42 : matrix.m42 - targetRect.top + 51),
      targetPage: parseInt(targetPage),
      isPosition: true,
      user: signs[index].user ? signs[index].user : composer.user
    }

    setState({
      signs
    })

    if(!state.signs[index].isPosition) {
      target.appendChild(d.node)
    }

    setComponents({
      type: 'signs',
      value: signs,
      user: signs[index].user ? signs[index].user : composer.user
    })
  }

  return (
    composer.isSetSign.length > 0 ? state.signs.map((item, index) => (
      <div
        key={index}
        style={{
          'position': 'absolute'
        }}
      >
        <Rnd
          size={{
            width: state.signs[index].width,
            height: state.signs[index].height
          }}
          bounds={'parent'}
          position={{
            x: (state.signs[index].isPosition ? state.signs[index].x : x - 75),
            y: (state.signs[index].isPosition ? state.signs[index].y : y - 120),
          }}
          onDragStop={(e, d) => {
            const signs = [...state.signs]
            signs[index] = {
              ...signs[index],
              x: d.x,
              y: d.y,
              lastX: d.lastX,
              lastY: d.lastY
            }

            setState({
              signs
            })

            setAppend(index, d)
          }}

          enableResizing={{
            top:false,
            right:false,
            bottom:false,
            left:false,
            topRight:false,
            bottomRight:false,
            bottomLeft:false,
            topLeft:false
          }}
        >
          <div className="drag-component input-sign-drag">
            <span className="sign drag-layer">
              전자
              <br />
              서명
            </span>
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
                {state.signs[index].user ? state.signs[index].user.userInfo.name : composer.user.userInfo.name}
              </span>

              <span
                className="color-dot"
                style={{'backgroundColor': '#' + (state.signs[index].user ? state.signs[index].user.userInfo.color : composer.user.userInfo.color)}}
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
  deleteComponent: composerActions.deleteComponent,
  setComponents: composerActions.setComponents
}

export default connect(
  mapStateToProps,
  actionCreators
)(Sign)
