import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { composerActions } from '../../store/actions'

import { Rnd } from 'react-rnd'
import { toast } from 'react-toastify'
import MousePosition from '../../hook/mouse-position'

const CheckBox = props => {

  const { composer, setComponent, setComponents } = props
  const { x, y } = MousePosition()
  const [ state, setState ] = useState({
    checkBoxes: []
  })

  useEffect(() => {
    if(state.checkBoxes.length < composer.isSetCheckBox.length) {
      const checkBoxes = [...state.checkBoxes]
      checkBoxes[composer.isSetCheckBox.length - 1] = {
        ...checkBoxes[composer.isSetCheckBox.length - 1],
        width: 22,
        height: 30,
        top: y,
        left: x,
        x: x,
        y: y,
        isPosition: false
      }

      setState({
        checkBoxes
      })
    }

  },[composer, state, x, y])

  const handleInit = (e, index) => {
    console.log(e.target.parentElement.parentElement.parentElement)
    const target = e.target.parentElement.parentElement
    target.remove()
  }

  const setAppend = (index, d) => {
    const checkBoxes = [...state.checkBoxes]

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

    const currentX = checkBoxes[index].x
    const latestX = checkBoxes[index].lastX

    checkBoxes[index] = {
      ...checkBoxes[index],
      x: (currentX === latestX ? matrix.m41 : matrix.m41 - targetRect.left),
      y: (currentX === latestX ? matrix.m42 : matrix.m42 - targetRect.top + 51),
      lastX: (currentX === latestX ? matrix.m41 : matrix.m41 - targetRect.left),
      lastY: (currentX === latestX ? matrix.m42 : matrix.m42 - targetRect.top + 51),
      targetPage: parseInt(targetPage),
      isPosition: true,
      user: checkBoxes[index].user ? checkBoxes[index].user : composer.user
    }

    setState({
      checkBoxes
    })

    if(!state.checkBoxes[index].isPosition) {
      target.appendChild(d.node)
    }

    setComponents({
      type: 'checkBoxes',
      value: checkBoxes,
      user: checkBoxes[index].user ? checkBoxes[index].user : composer.user
    })
  }

	return (
    composer.isSetCheckBox.length > 0 ? state.checkBoxes.map((item, index) => (
      <div
        key={index}
        style={{
          'position': 'absolute'
        }}
      >
        <Rnd
          size={{
            width: state.checkBoxes[index].width,
            height: state.checkBoxes[index].height
          }}
          bounds={'parent'}
          position={{
            x: (state.checkBoxes[index].isPosition ? state.checkBoxes[index].x : x - 20),
            y: (state.checkBoxes[index].isPosition ? state.checkBoxes[index].y : y - 60),
          }}
          onDragStop={(e, d) => {
            const checkBoxes = [...state.checkBoxes]
            checkBoxes[index] = {
              ...checkBoxes[index],
              x: d.x,
              y: d.y,
              lastX: d.lastX,
              lastY: d.lastY,
              user: checkBoxes[index].user ? checkBoxes[index].user : composer.user
            }

            setState({
              checkBoxes
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
          <div className="drag-component input-checkbox-drag">
            <span className="check drag-layer">
              <input
                type="checkbox"
                id="checkbox"
                className="checkbox"
                defaultChecked={true}
                readOnly
              />
              <label htmlFor="none"></label>
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
                  {state.checkBoxes[index].user ? state.checkBoxes[index].user.userInfo.name : composer.user.userInfo.name}
                </span>
                */}
                <span
                  className="color-dot"
                  style={{'backgroundColor': '#' + (state.checkBoxes[index].user ? state.checkBoxes[index].user.userInfo.color : composer.user.userInfo.color)}}
                >
                </span>
              </div>
            </span>
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
  setComponents: composerActions.setComponents
}

export default connect(
  mapStateToProps,
  actionCreators
)(CheckBox)
