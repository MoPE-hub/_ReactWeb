import React, { Component } from "react"
import { connect } from 'react-redux'
import { loaderActions, controllerActions } from '../../../store/actions'

class SignPads extends Component {

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
        if(item.components.signPads.length < 1) return

        item.components.signPads.map((itemSignPad, itemSignPadIndex) => {
          const target = document.getElementsByClassName('pdfAnnotationLayer')[itemSignPad.targetPage - 1]
          const signPad = document.createElement('div')

          signPad.key = 'checkBox-' + itemSignPadIndex
          signPad.className = 'drag-component input-sign-pad-drag input-sign-pad-normal preview-annotation'
          signPad.style.position = 'absolute'
          signPad.style.width = itemSignPad.width + 'px'
          signPad.style.height = itemSignPad.height + 'px'
          // signPad.style.left = itemSignPad.x + 'px'
          // signPad.style.top = itemSignPad.y + 'px'
          signPad.style.transform = 'translate(' + Math.floor(itemSignPad.x) + 'px, ' + Math.floor(itemSignPad.y) + 'px)'

          const signPadInner = document.createElement('div')
          signPadInner.className = 'input-drag drag-layer'
          signPadInner.style.background = '#e2e2e2'
          signPadInner.style.width = '100%'
          signPadInner.style.height = '100%'
          signPadInner.style.padding = '1rem 1rem'
          signPadInner.style.whiteSpace = 'nowrap'
          signPadInner.style.overflow = 'hidden'
          signPadInner.style.display = 'flex'
          signPadInner.style.alignItems = 'center'

          const signPadInnerSpan = document.createElement('span')
          signPadInnerSpan.style.width = '100%'
          signPadInnerSpan.style.color = '#999999'
          signPadInnerSpan.style.whiteSpace = 'nowrap'
          signPadInnerSpan.style.textOverflow = 'ellipsis'
          signPadInnerSpan.style.textAlign = 'center'
          signPadInnerSpan.style.overflow = 'hidden'
          signPadInnerSpan.style.fontSize = '1.7rem'
          signPadInnerSpan.innerHTML = '전자서명 패드'

          signPad.appendChild(signPadInner)
          signPadInner.appendChild(signPadInnerSpan)

          target.appendChild(signPad)

          signPad.onclick = function () {
            alert('사인액션')
          }

          /***************************
            썸네일에 위치 보이기
          ****************************/

          const thumbNailTarget = document.getElementsByClassName('thumbnail')[itemSignPad.targetPage - 1]
          const thumbNailAnnotationLayer = document.createElement('div')
          thumbNailAnnotationLayer.className = 'preview-annotation'
          thumbNailAnnotationLayer.style.position = 'absolute'
          thumbNailAnnotationLayer.style.width = '8px'
          thumbNailAnnotationLayer.style.height = '8px'
          thumbNailAnnotationLayer.style.borderRadius = '50%'
          thumbNailAnnotationLayer.style.background = 'red'
          thumbNailAnnotationLayer.style.zIndex = 9
          thumbNailAnnotationLayer.style.left = itemSignPad.x / 11 + 'px'
          thumbNailAnnotationLayer.style.top = itemSignPad.y / 10 + 'px'

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
)(SignPads)
