import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { columnsActions } from '../../store/actions'

import { Rnd } from 'react-rnd'
import { toast } from 'react-toastify'
import MousePosition from '../../hook/mouse-position'

const Expansion = props => {

  const { columns, setColumnComponent, deleteComponent, setColumnsComponents } = props
  const { x, y } = MousePosition()
  const [ state, setState ] = useState({
    columnsExpansions: []
  })

  useEffect(() => {
    if(state.columnsExpansions.length < columns.isColumnsExpansion.length) {
      const columnsExpansions = [...state.columnsExpansions]
      columnsExpansions[columns.isColumnsExpansion.length - 1] = {
        ...columnsExpansions[columns.isColumnsExpansion.length - 1],
        width: 259,
        height: 44,
        x: x,
        y: y,
        isPosition: false
      }

      setState({
        columnsExpansions
      })
    }

  },[columns, state, x, y])

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
    const columnsExpansions = [...state.columnsExpansions]

    if(state.columnsExpansions[index].isPosition) {
      return
    }

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

    target.appendChild(d.node)

    /***************
      스케일 & 위치보정
    ****************/

    const targetRect = target.getBoundingClientRect()
    const style = window.getComputedStyle(d.node)
    const matrix = new DOMMatrixReadOnly(style.transform)

    columnsExpansions[index] = {
      ...columnsExpansions[index],
      x: matrix.m41 - targetRect.left,
      y: matrix.m42 - targetRect.top + 51,
      lastX: matrix.m41 - targetRect.left,
      lastY: matrix.m42 - targetRect.top + 51,
      targetPage: parseInt(targetPage),
      isPosition: true,
      column: columnsExpansions[index].column ? columnsExpansions[index].column : columns.column
    }

    setState({
      columnsExpansions
    })

    setColumnsComponents({
      type: 'columnsExpansions',
      value: columnsExpansions,
      column: columnsExpansions[index].column ? columnsExpansions[index].column : columns.column
    })

    /***************
      이거 잘 안된다.

    const targetScale = target.getAttribute('data-viewport-scale')
    const transX = matrix.m41 * targetScale
    const transY = matrix.m42 * targetScale

    const translate = 'translate(' + Math.floor(transX) + 'px, ' + Math.floor(transY) + 'px)'
    const scale = ' scale(' + targetScale + ')'

    d.node.style.transformOrigin = 'top right'
    d.node.style.transform = translate
    d.node.style.transform += scale

      이거 잘 안된다.
    ****************/

  }

	return (
    columns.isColumnsExpansion.length > 0 ? state.columnsExpansions.map((item, index) => (
      <div
        key={index}
        style={{
          'position': 'absolute'
        }}
      >
        <Rnd
          size={{
            width: state.columnsExpansions[index].width,
            height: state.columnsExpansions[index].height
          }}
          bounds={'parent'}
          maxWidth={900}
          maxHeight={300}
          minWidth={100}
          minHeight={30}
          position={{
            x: (state.columnsExpansions[index].isPosition ? state.columnsExpansions[index].x : x - 252),
            y: (state.columnsExpansions[index].isPosition ? state.columnsExpansions[index].y : y - 84),
          }}
          onDragStop={(e, d) => {
            const columnsExpansions = [...state.columnsExpansions]
            columnsExpansions[index] = {
              ...columnsExpansions[index],
              x: d.x,
              y: d.y,
              lastX: d.lastX,
              lastY: d.lastY,
              column: columnsExpansions[index].column ? columnsExpansions[index].column : columns.column
            }

            setState({
              columnsExpansions
            })

            setAppend(index, d)
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            const columnsExpansions = [...state.columnsExpansions]
            columnsExpansions[index] = {
              ...columnsExpansions[index],
              width: ref.style.width,
              height: ref.style.height,
              x: position.x,
              y: position.y,
              column: columnsExpansions[index].column ? columnsExpansions[index].column : columns.column
            }

            setState({
              columnsExpansions
            })
          }}
        >
          <div
            className="drag-component input-text-drag"
          >
            <input
              type="text"
              className="input-drag drag-layer"
              placeholder={
                state.columnsExpansions[index].column
                ?
                state.columnsExpansions[index].column.columnInfo.column.title
                :
                columns.column.columnInfo.column.title
              }
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
              {/*
              <span className="name">
                {}
              </span>

              <span
                className="color-dot"
                style={}
              >
              </span>
              */}
            </div>
          </div>
        </Rnd>
      </div>
    )) : null
  )
}

const mapStateToProps = state => {
  return {
    columns: state.columns
  }
}

const actionCreators = {
  setColumnsComponent: columnsActions.setColumnsComponent,
  deleteColumnComponent: columnsActions.deleteColumnComponent,
  setColumnsComponents: columnsActions.setColumnsComponents
}

export default connect(
  mapStateToProps,
  actionCreators
)(Expansion)
