import React, { Component } from 'react'
import { connect } from 'react-redux'
import { controllerActions } from '../../store/actions'

import Icon from '../../component/svg/Svg'

class PreViewController extends Component {

  constructor(props) {
    super(props)

    this.state = {
      DEFAULT_SCALE_DELTA: 1.3,
      MIN_SCALE: 0.35,
      MAX_SCALE: 2,
      currentScale: 1,
      items: []
    }
  }

  render() {

    const getTransform = (newScale) => {
      const target = document.getElementsByClassName('pdfAnnotationLayer')
      const elements = Array.from(target)

      elements.map((element) => {
        const items = Array.from(element.children)

        return items.map((item, index) => {
          const style = window.getComputedStyle(item)
          const matrix = new DOMMatrixReadOnly(style.transform)

          if(!this.state.items[index]) {
            items[index] = {
              ...this.state.items[index],
              finalTransX: matrix.m41,
              finalTransY: matrix.m42
            }

            this.setState({
              items
            })
          }

          const transX = (this.state.items[index] ? this.state.items[index].finalTransX * newScale : matrix.m41 * newScale)
          const transY = (this.state.items[index] ? this.state.items[index].finalTransY * newScale : matrix.m42 * newScale)

          const translate = 'translate(' + Math.floor(transX) + 'px, ' + Math.floor(transY) + 'px)'
          const scale = ' scale(' + newScale + ')'

          item.style.transformOrigin = 'top left'
          item.style.transform = translate
          item.style.transform += scale

          // 여기서 보정을 하느냐...
          console.log(item, index)

          return items
        })
      })
    }

    const zoomIn = (ticks) => {
      var newScale = this.state.currentScale
      do {
        newScale = (newScale / this.state.DEFAULT_SCALE_DELTA).toFixed(2)
        newScale = Math.floor(newScale * 10) / 10
        newScale = Math.max(this.state.MIN_SCALE, newScale)
      } while (--ticks && newScale > this.state.MIN_SCALE)

      this.props.zoomIn(newScale)

      this.setState({
        ...this.state,
        currentScale: newScale
      })

      getTransform(newScale)
    }

    const zoomOut = (ticks) => {
      var newScale = this.state.currentScale
      do {
        newScale = (newScale * this.state.DEFAULT_SCALE_DELTA).toFixed(2)
        newScale = Math.ceil(newScale * 10) / 10
        newScale = Math.min(this.state.MAX_SCALE, newScale)
      } while (--ticks && newScale < this.state.MAX_SCALE)

      this.props.zoomOut(newScale)

      this.setState({
        ...this.state,
        currentScale: newScale
      })

      getTransform(newScale)
    }

    return (
      <React.Fragment>
        <div className="header-controller">

          <button
            className="btn btn-transparent"
            tooltip="크게" flow="down"
            onClick={() => zoomOut()}
          >
            <Icon icon="plus" width={22} height={22} />
          </button>

          <button
            className="btn btn-transparent"
            tooltip="작게" flow="down"
            onClick={() => zoomIn()}
          >
            <Icon icon="minus" width={22} height={22} />
          </button>

          <button
            className="btn btn-transparent"
            tooltip="창닫기" flow="down"
            onClick={() => window.close()}
          >
            <Icon icon="exit" width={23} height={23} />
          </button>

        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    component: state.component,
    controller: state.controller
  }
}

const actionCreators = {
  zoomIn: controllerActions.zoomIn,
  zoomOut: controllerActions.zoomOut,
  setViewType: controllerActions.setViewType
}

export default connect(
  mapStateToProps,
  actionCreators
)(PreViewController)
