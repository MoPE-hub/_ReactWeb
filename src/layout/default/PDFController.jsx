import React, { Component } from 'react'
import { connect } from 'react-redux'
import { controllerActions } from '../../store/actions'

import SelectBox from "../../module/select-box"
import Icon from "../../component/svg/Svg"

class PDFController extends Component {

  constructor(props) {
    super(props)

    this.state = {
      DEFAULT_SCALE_DELTA: 1.3,
      MIN_SCALE: 0.35,
      MAX_SCALE: 1.7,
      currentScale: 'auto',
      prevScale: '',
      items: []
    }
  }

  componentDidMount() {
    document.addEventListener('scalechanging', this.getScale)
  }

  /***********
    스케일 조정
  ************/

  getScale = (e) => {
    const newScale = e.detail.scale
    const target = document.getElementsByClassName('pdfAnnotationLayer')
    const elements = Array.from(target)

    // 이거이 움직일때마다 바껴야 하는거잖어?
    this.setState({
      prevScale: e.detail.scale
    })

    elements.map((element) => {
      const items = Array.from(element.children)

      return items.map((item, index) => {

        const style = window.getComputedStyle(item)
        const matrix = new DOMMatrixReadOnly(style.transform)

        if(!this.state.items[index]) {
          items[index] = {
            ...this.state.items[index],
            /*
            finalTransX: newScale !== 1 ? matrix.m41 / this.state.prevScale : item.offsetLeft,
            finalTransY: newScale !== 1 ? matrix.m42 / this.state.prevScale : item.offsetTop
            */
            finalTransX: newScale !== 1 ? item.offsetLeft / this.state.prevScale : item.offsetLeft,
            finalTransY: newScale !== 1 ? item.offsetTop / this.state.prevScale : item.offsetTop
          }

          this.setState({
            items
          })
        }

        /* 트랜스폼 안쓸경우..
        const transX = (this.state.items[index] ? this.state.items[index].finalTransX * newScale : (matrix.m41 / this.state.prevScale) * newScale)
        const transY = (this.state.items[index] ? this.state.items[index].finalTransY * newScale : (matrix.m42 / this.state.prevScale) * newScale)

        const translate = 'translate(' + Math.floor(transX) + 'px, ' + Math.floor(transY) + 'px)'
        const scale = ' scale(' + newScale + ')'

        item.style.transformOrigin = 'left top'
        item.style.transform = translate
        item.style.transform += scale
        */

        const transX = (this.state.items[index] ? this.state.items[index].finalTransX * newScale : (item.offsetLeft / this.state.prevScale) * newScale)
        const transY = (this.state.items[index] ? this.state.items[index].finalTransY * newScale : (item.offsetTop / this.state.prevScale) * newScale)
        const scale = ' scale(' + newScale + ')'

        item.style.transform = scale
        item.style.left = transX + 'px'
        item.style.top = transY + 'px'

        return items
      })
    })
  }

  render() {
    const { controller } = this.props

    const zoomIn = (ticks) => {
      const currentScale = document.getElementsByClassName('pdfAnnotationLayer')[0].getAttribute('data-viewport-scale')
      var newScale = currentScale
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
    }

    const zoomOut = (ticks) => {
      const currentScale = document.getElementsByClassName('pdfAnnotationLayer')[0].getAttribute('data-viewport-scale')
      var newScale = currentScale
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
    }

    const preview = (type) => {
      this.props.setViewType(type)
    }

    const onScaleChange = (item) => {
      this.props.setScale(item.value)
    }

    return (
      <React.Fragment>
        <div className="header-controller">
          <button
            className="btn btn-transparent"
            tooltip="썸네일" flow="down"
            onClick={this.props.toggleThumbnail}
          >
            <Icon icon="sideBar" width={24} height={24} />
          </button>

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

          <SelectBox
            className={'sm'}
            title={'크기 선택'}
            value={[
              {
                title: '원본크기',
                value: 1
              },
              {
                title: '자동',
                value: 'auto'
              },
              {
                title: '30%',
                value: 0.35
              },
              {
                title: '50%',
                value: 0.5
              },
              {
                title: '70%',
                value: 0.7
              },
              {
                title: '120%',
                value: 1.3
              },
              {
                title: '150%',
                value: 1.5
              },
              {
                title: '170%',
                value: 1.7
              }
            ]}
            onChange={(item) => onScaleChange(item)}
            isSelected={`${this.state.currentScale}`}
          />
          {
            controller.viewType !== 'COMPLETE' && controller.viewType !== 'SIGNER' ?
              <button
                className={this.props.controller.viewType === 'COMPOSE' ? 'btn btn-transparent' : 'btn btn-transparent hover'}
                tooltip={this.props.controller.viewType === 'COMPOSE' ? '미리보기' : '미리보기 종료'} flow="down"
                onClick={() => preview(
                  this.props.controller.viewType === 'COMPOSE' ? 'PREVIEW' : 'COMPOSE'
                )}
              >
                <Icon icon="preview" width={22} height={22} />
              </button>
            : ''
          }
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
  setScale: controllerActions.setScale,
  setViewType: controllerActions.setViewType,
  toggleThumbnail: controllerActions.toggleThumbnail
}

export default connect(
  mapStateToProps,
  actionCreators
)(PDFController)
