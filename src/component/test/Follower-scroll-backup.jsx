import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import GetWindowSize from '../hook/get-width'
import TargetScroll from '../hook/target-scroll'
import Debounce from '../hook/debounce'

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
  const debouncedScroll = Debounce(scrollDetect, 1000)

  /***************
    flow박스 초기화
  ****************/

  const getCurrentPosition = () => {
    const target = document.getElementsByClassName('flow')[0]
    // FIXME: 이거 스크롤 문제가 있네...

    // || currentPosition > document.getElementById('viewerContainer').scrollTop + window.screen.height - 200

    if(scroll > currentPosition) {
      // target.classList.remove('active')
      // setCurrentPosition(null)

      return scroll + 30
    }
  }

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
      positions.push(top + height / 2)
    })

    positions.sort(function (a, b) {
      return a - b
    })

    setPositions(positions)
  }

  /***************
    각 엘리먼트 위치로 이동..
  ****************/

  const onTarget = (e, type) => {
    setScrollDetect(true)

    const target = e.target.parentElement.parentElement

    if(currentNearByPosition && !target.classList.contains('active')) {
      // type === 'next' ? target.style.top = currentNearByPosition.next + 'px' : target.style.top = currentNearByPosition.prev + 'px'
      // target.classList.add('active')
      //
      // const currentCount = positions.indexOf(type === 'next' ? currentNearByPosition.next : currentNearByPosition.prev)
      // setCount(currentCount)
      //
      // console.log(positions)
      // console.log(currentNearByPosition.next)
      // console.log(currentCount)
      //
      // // const currentPosition = positions[(type === 'next' ? count + 1 : count - 1)]
      // // setCurrentPosition(type === 'next' ? target.style.top = currentNearByPosition.next + 'px' : target.style.top = currentNearByPosition.prev + 'px')
      //
      // console.log('이거냐?')
    }
    else {

      const currentPosition = positions[(type === 'next' ? count + 1 : count - 1)]
      target.style.top = currentPosition + 'px'

      count > -2 ? target.classList.add('active') : target.classList.remove('active')
      const currentCount = (type === 'next' && positions.length - 1 > count ? count + 1 : type === 'prev' && count > 0 ? count - 1 : count)
      setCount(currentCount)

      target.parentElement.scrollTop = currentPosition + 130 - window.outerHeight / 2

      setCurrentPosition(currentPosition)
    }
  }

  useEffect(() => {
    if(pdfRef) {
      const target = document.getElementsByClassName('pdfAnnotationLayer')[0]
      const targetRect = target.getBoundingClientRect()
      const targetLeft = targetRect.left
      const targetWidth = targetRect.width
      const targetTop = targetRect.top

      const thumbnailView = document.getElementById('thumbnailView')
      const thumbnailViewRect = thumbnailView.getBoundingClientRect()
      const thumbnailViewWidth = thumbnailViewRect.width

      setPosition({
        left: targetWidth + targetLeft - thumbnailViewWidth + 20,
        top: targetTop - 30
      })

      if (!positions) { getElementsPositions() }

      /***************
        가까운 엘리먼트 찾기
      ****************/

      if(positions && scroll) {
        const closestElement = positions.reduce((a, b) => {
            return Math.abs(b - scroll) < Math.abs(a - scroll) ? b : a;
        })

        const closestElementIndex = positions.indexOf(closestElement)

        setCurrentNearByPosition({
          prev: positions[closestElementIndex],
          next: positions[closestElementIndex + 1]
        })
      }

      /***************
        스크롤 잠그기 / 풀기
      ****************/

      debouncedScroll ? setScrollDetect(false) : console.log('ing...')
    }
  }, [props, controller, windowSize, scroll, debouncedScroll])

  return (
    <React.Fragment>
      {
        position ?
          <div
            className="flow"
            style={{
              "left": position.left + 'px',
              "top": `${scrollDetect ? currentPosition: (currentPosition ? getCurrentPosition() : scroll + 30)}` + 'px'
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
