import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import GetWindowSize from '../hook/get-width'
import TargetScroll from '../hook/target-scroll'

const Follower = props => {
  const { controller, pdfRef } = props
  const [ position, setPosition ] = useState(null)
  const [ positions, setPositions ] = useState()
  const [ scrollDetect, setScrollDetect ] = useState(false)
  const [ currentPosition, setCurrentPosition ] = useState(null)
  const [ currentNearByPosition, setCurrentNearByPosition ] = useState(null)
  const [ count, setCount ] = useState(-1)
  const { scroll, direction } = TargetScroll(
    'viewerContainer'
  )
  const windowSize = GetWindowSize()

  /***************
    각 엘리먼트 위치 가져옴
  ****************/

  const getElementsPositions = () => {
    const target = document.getElementsByClassName('drag-component')
    const targetArray = Array.from(target)
    const positions = new Array

    targetArray.map((item, index) => {
      const top = item.getBoundingClientRect().y - (position ? position.top : 51) - 30
      const height = item.getBoundingClientRect().height
      positions.push({
        position: top + height / 2,
        node: item
      })
    })

    positions.sort(function(a, b) {
      return a.node.getBoundingClientRect().x - b.node.getBoundingClientRect().x
    })

    positions.sort(function(a, b) {
      return a.node.getBoundingClientRect().y - b.node.getBoundingClientRect().y
    })

    setPositions(positions)
  }

  /***************
    각 엘리먼트 위치로 이동..
  ****************/

  const onTarget = (e, type) => {
    setScrollDetect(true)

    const target = e.target.parentElement.parentElement
    const currentPosition = positions[(type === 'next' ? count + 1 : count - 1)]
    const currentCount = (type === 'next' && positions.length - 1 > count ? count + 1 : type === 'prev' && count > 0 ? count - 1 : count)
    setCount(currentCount)

    positions.map((item) => {
      item.node.classList.remove('animation-focus')
    })

    if(positions[currentCount] && currentPosition) {
      positions[currentCount].node.classList.add('animation-focus')
      target.parentElement.scrollTop = currentPosition.position + 130 - window.outerHeight / 2
    }

    setCurrentPosition(currentPosition)
  }

  useEffect(() => {
    if(pdfRef) {
      const target = document.getElementsByClassName('pdfAnnotationLayer')[0]
      const targetRect = target.getBoundingClientRect()
      const targetWidth = targetRect.width
      const targetLeft = targetRect.left
      const targetTop = targetRect.top

      const thumbnailView = document.getElementById('thumbnailView')
      const thumbnailViewRect = thumbnailView.getBoundingClientRect()
      const thumbnailViewWidth = thumbnailViewRect.width

      setPosition({
        left: targetWidth + targetLeft + 20,
        top: 50,
        arrowLeft: targetWidth + targetLeft - thumbnailViewWidth,
      })

      if (!positions) { getElementsPositions() }
    }
  }, [props, controller, windowSize, scroll])

  return (
    <React.Fragment>
      {
        position ?
          <React.Fragment>
          <div
            className="flow fixed"
            style={{
              "left": position.left + 'px',
              "top": position.top + 30 + 'px'
            }}
          >
            <button>
              <span
                className="arrow-top"
                onClick={(e) => onTarget(e, 'prev')}
              >
              </span>
              { count > -1 ? count + 1 : '-' }
              <span className="sep">|</span>
              <span className="total">
                { props.pageNum }
              </span>
              <span className="arrow"></span>
              {
                count + 1 !== positions.length ?
                <span
                  className="arrow-bottom"
                  onClick={(e) => onTarget(e, 'next')}
                >
                </span>
                : ''
              }
            </button>
          </div>
          {
            currentPosition ?
              <div
                className="follow-arrow"
                style={{
                  "left": position.arrowLeft + 'px',
                  "top": currentPosition.position + 18 + 'px'
                }}
              >
                <span className="arrow"></span>
              </div>
            : ''
          }
          </React.Fragment>
        : ''
      }
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    controller: state.controller
  }
}

const actionCreators = {

}

export default connect(
  mapStateToProps,
  actionCreators
)(Follower)
