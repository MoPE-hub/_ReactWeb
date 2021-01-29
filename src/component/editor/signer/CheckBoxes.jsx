import React, { Component } from "react"
import { connect } from 'react-redux'
import { loaderActions, controllerActions } from '../../../store/actions'

class CheckBoxes extends Component {

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
        if(item.components.checkBoxes.length < 1) return

        item.components.checkBoxes.map((itemCheckBox, itemCheckBoxIndex) => {
          const target = document.getElementsByClassName('pdfAnnotationLayer')[itemCheckBox.targetPage - 1]
          const checkBox = document.createElement('div')

          checkBox.key = 'checkBox-' + itemCheckBoxIndex
          checkBox.className = 'drag-component input-checkbox-drag preview-annotation'
          checkBox.style.position = 'absolute'
          checkBox.style.width = itemCheckBox.width + 'px'
          checkBox.style.height = itemCheckBox.height + 'px'
          // checkBox.style.left = itemCheckBox.x + 'px'
          // checkBox.style.top = itemCheckBox.y + 'px'
          checkBox.style.transform = 'translate(' + Math.floor(itemCheckBox.x) + 'px, ' + Math.floor(itemCheckBox.y) + 'px)'

          const checkBoxSpan = document.createElement('span')
          checkBoxSpan.className = 'check drag-layer'

          const checkInputBox = document.createElement('input')
          checkInputBox.id = 'checkBox-' + itemCheckBoxIndex
          checkInputBox.type = 'checkbox'
          checkInputBox.className = 'checkbox'

          const checkLabel = document.createElement('label')
          checkLabel.htmlFor = 'checkBox-' + itemCheckBoxIndex

          checkBox.appendChild(checkBoxSpan)
          checkBoxSpan.appendChild(checkInputBox)
          checkBoxSpan.appendChild(checkLabel)

          target.appendChild(checkBox)

          checkLabel.onclick = function () {
            alert('체크액션')
          }

          /***************************
            썸네일에 위치 보이기
          ****************************/

          const thumbNailTarget = document.getElementsByClassName('thumbnail')[itemCheckBox.targetPage - 1]
          const thumbNailAnnotationLayer = document.createElement('div')
          thumbNailAnnotationLayer.className = 'preview-annotation'
          thumbNailAnnotationLayer.style.position = 'absolute'
          thumbNailAnnotationLayer.style.width = '8px'
          thumbNailAnnotationLayer.style.height = '8px'
          thumbNailAnnotationLayer.style.borderRadius = '50%'
          thumbNailAnnotationLayer.style.background = 'orange'
          thumbNailAnnotationLayer.style.zIndex = 9
          thumbNailAnnotationLayer.style.left = itemCheckBox.x / 11.5 + 'px'
          thumbNailAnnotationLayer.style.top = itemCheckBox.y / 10.5 + 'px'

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
)(CheckBoxes)
