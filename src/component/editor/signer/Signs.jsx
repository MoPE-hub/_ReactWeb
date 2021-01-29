import React, { Component } from "react"
import { connect } from 'react-redux'
import { loaderActions, controllerActions } from '../../../store/actions'

class Signs extends Component {

  constructor(props) {
    super(props)

    const { controller, composer } = props

    this.state = {
      //
    }
  }

  componentDidMount() {

    const { composer } = this.props

    if(composer.users.length > 0) {
      composer.users.map((item, index) => {
        if(item.components.signs.length < 1) return

        item.components.signs.map((itemSigns, itemSignsIndex) => {
          const target = document.getElementsByClassName('pdfAnnotationLayer')[itemSigns.targetPage - 1]
          const sign = document.createElement('div')

          sign.key = 'sign' + itemSignsIndex
          sign.className = 'drag-component input-sign-drag preview-annotation'
          sign.style.position = 'absolute'
          sign.style.width = itemSigns.width + 'px'
          sign.style.height = itemSigns.height + 'px'
          // sign.style.left = itemSigns.x + 'px'
          // sign.style.top = itemSigns.y + 'px'
          sign.style.transform = 'translate(' + Math.floor(itemSigns.x) + 'px, ' + Math.floor(itemSigns.y) + 'px)'

          const signInnerSpan = document.createElement('span')
          signInnerSpan.className = 'sign drag-layer'
          signInnerSpan.innerHTML = '전자 <br /> 서명'

          sign.appendChild(signInnerSpan)

          target.appendChild(sign)

          sign.onclick = function () {
            alert('전부 입력 확인후 서명액션')
          }

          /***************************
            썸네일에 위치 보이기
          ****************************/

          const thumbNailTarget = document.getElementsByClassName('thumbnail')[itemSigns.targetPage - 1]
          const thumbNailAnnotationLayer = document.createElement('div')
          thumbNailAnnotationLayer.className = 'preview-annotation'
          thumbNailAnnotationLayer.style.position = 'absolute'
          thumbNailAnnotationLayer.style.width = '8px'
          thumbNailAnnotationLayer.style.height = '8px'
          thumbNailAnnotationLayer.style.borderRadius = '50%'
          thumbNailAnnotationLayer.style.background = 'green'
          thumbNailAnnotationLayer.style.zIndex = 9
          thumbNailAnnotationLayer.style.left = itemSigns.x / 11 + 'px'
          thumbNailAnnotationLayer.style.top = itemSigns.y / 10 + 'px'

          thumbNailTarget.appendChild(thumbNailAnnotationLayer)
        })
      })
    }
  }

  render() {
    return (
      <React.Fragment></React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    composer: state.composer
  }
}

const actionCreators = {

}

export default connect(
  mapStateToProps,
  actionCreators
)(Signs)
