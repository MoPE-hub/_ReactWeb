import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import GetWindowSize from '../../hook/get-width'
import TargetScroll from '../../hook/target-scroll'
import Debounce from '../../hook/debounce'

const Follower = props => {
  // const { controller } = props
  // const [ position, setPosition ] = useState(null)
  // const windowSize = GetWindowSize()
  // const [ annotationNum, setAnnotationNum ] = useState(0)
  // // const [ pageNum, setPageNum ] = useState(1)
  // const [ annotationNext, setAnnotationNext ] = useState()
  // const [ positions, setPositions ] = useState()
  const { controller, pdfRef } = props
  const [ position, setPosition ] = useState(null)
  const [ positions, setPositions ] = useState()
  const [ scrollDetect, setScrollDetect ] = useState(false)
  const [ currentPosition, setCurrentPosition ] = useState(null)
  const [ count, setCount ] = useState(-1)
  const { scroll, direction } = TargetScroll(
    'viewerContainer'
  )
  const windowSize = GetWindowSize()
  const debouncedScroll = Debounce(scrollDetect, 1000)

  /**********
   1. fixed 를 쓰면 위치가 망가지고 클릭불가...
   **********/

  const getPositions = () => {
    const annotationPosition = document.getElementsByClassName('drag-component')
    const annotationPositionArray = Array.from(annotationPosition)
    const positions = []

    annotationPositionArray.map((item) => {
      positions.push({
        top: item.getBoundingClientRect().top - 50,
        height: item.getBoundingClientRect().height / 2
      })
    })

    positions.sort(function (a, b) {
      return a.top - b.top
    })

    setPositions(positions)
  }

  const onTarget = (e, type) => {
    // FIXME: 근사위치로 이동... 시킨다.

    setScrollDetect(true)

    const currentPosition = positions[(type === 'next' ? count + 1 : count - 1)]
    const target = e.target.parentElement.parentElement
    target.style.top = currentPosition.top + 'px'

    console.log(positions[9])

    console.log(currentPosition.top)

    count > -2 ? target.classList.add('active') : target.classList.remove('active')
    const currentCount = (type === 'next' && positions.length - 1 > count ? count + 1 : type === 'prev' && count > 0 ? count - 1 : count)
    setCount(currentCount)

    target.parentElement.scrollTop = currentPosition + 130 - window.outerHeight / 2
    setCurrentPosition(currentPosition)
  }

  useEffect(() => {
    if(props.pdfRef) {
      const target = document.getElementsByClassName('pdfAnnotationLayer')[0]
      const targetRect = target.getBoundingClientRect()
      const targetLeft = targetRect.left
      const targetWidth = targetRect.width
      const targetTop = targetRect.top

      setPosition({
        top: targetTop,
        left: targetWidth + targetLeft - 100,
        transition: "all .3s"
      })

      getPositions()

      /***************
       스크롤 잠그기 / 풀기
       ****************/

      debouncedScroll ? setScrollDetect(false) : console.log('ing...')
    }
  }, [props.pdfRef, windowSize, controller])

  return (
    <React.Fragment>
      {
        position ?
          <div
            className="flow"
            style={{
              "left": position.left + 'px',
              "top": `${scrollDetect ? currentPosition: (currentPosition ? getPositions() : scroll + 30)}` + 'px'
            }}
          >
            <button>
              <span
                className="arrow-top"
                onClick={(e) => onTarget(e, 'prev')}
              ></span>
              { count > -1 ? count + 1 : '-' }
              <span className="sep">|</span>
              <span className="total">
                { props.pageNum }
              </span>
              <span className="arrow"></span>
              <span
                className="arrow-bottom"
                onClick={(e) => onTarget(e, 'next')}
              ></span>
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
