import React, { Component } from "react"
import { connect } from 'react-redux'
import { loaderActions } from '../../../store/actions'

class TextBoxes extends Component {

  constructor(props) {
    super(props)

    this.state = {
      //
    }
  }

  componentDidMount() {

    const { composer } = this.props

    if(composer.users.length > 0) {
      composer.users.map((item, index) => {
        if(item.components.textBoxes.length < 1) return

        item.components.textBoxes.map((itemTextBox, itemTextBoxIndex) => {
          const target = document.getElementsByClassName('pdfAnnotationLayer')[itemTextBox.targetPage - 1]
          const textBox = document.createElement('div')

          textBox.key = 'textBox-' + itemTextBoxIndex
          textBox.className = 'drag-component input-text-drag input-text-normal preview-annotation'
          textBox.style.position = 'absolute'
          textBox.style.width = itemTextBox.width + 'px'
          textBox.style.height = itemTextBox.height + 'px'
          // textBox.style.left = itemTextBox.x + 'px'
          // textBox.style.top = itemTextBox.y + 'px'
          textBox.style.transform = 'translate(' + Math.floor(itemTextBox.x) + 'px, ' + Math.floor(itemTextBox.y) + 'px)'

          const inputBox = document.createElement('input')
          inputBox.type = 'text'
          inputBox.className = 'input-drag drag-layer'
          inputBox.readOnly = false
          inputBox.placeholder = ''

          textBox.appendChild(inputBox)
          target.appendChild(textBox)

          textBox.onclick = function () {
            console.log('텍스트 입력 창 띄우기')
          }

          /***************************
            썸네일에 위치 보이기
          ****************************/

          const thumbNailTarget = document.getElementsByClassName('thumbnail')[itemTextBox.targetPage - 1]
          const thumbNailAnnotationLayer = document.createElement('div')
          thumbNailAnnotationLayer.className = 'preview-annotation'
          thumbNailAnnotationLayer.style.position = 'absolute'
          thumbNailAnnotationLayer.style.width = '8px'
          thumbNailAnnotationLayer.style.height = '8px'
          thumbNailAnnotationLayer.style.borderRadius = '50%'
          thumbNailAnnotationLayer.style.background = 'blue'
          thumbNailAnnotationLayer.style.zIndex = 9
          thumbNailAnnotationLayer.style.left = itemTextBox.x / 10 + 'px'
          thumbNailAnnotationLayer.style.top = itemTextBox.y / 10.5 + 'px'

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
)(TextBoxes)
