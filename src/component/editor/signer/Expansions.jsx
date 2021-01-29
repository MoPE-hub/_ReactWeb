import React, { Component } from "react"
import { connect } from 'react-redux'
import { loaderActions } from '../../../store/actions'

class Expansions extends Component {

  constructor(props) {
    super(props)

    this.state = {
      //
    }
  }

  componentDidMount() {

    const { columns } = this.props

    if(columns.columns.length > 0) {
      columns.columns.map((item, index) => {
        if(item.components.columnsExpansions.length < 1) return

        item.components.columnsExpansions.map((itemExpansion, itemExpansionIndex) => {
          const target = document.getElementsByClassName('pdfAnnotationLayer')[itemExpansion.targetPage - 1]
          const expansionBox = document.createElement('div')

          expansionBox.key = 'expansion-' + itemExpansionIndex
          expansionBox.className = 'drag-component input-text-drag input-text-normal preview-annotation'
          expansionBox.style.position = 'absolute'
          expansionBox.style.width = itemExpansion.width + 'px'
          expansionBox.style.height = itemExpansion.height + 'px'
          expansionBox.style.left = itemExpansion.x + 'px'
          expansionBox.style.top = itemExpansion.y + 'px'

          const inputBox = document.createElement('input')
          inputBox.type = 'text'
          inputBox.className = 'input-drag drag-layer'
          inputBox.readOnly = false
          inputBox.placeholder = item.column.title

          expansionBox.appendChild(inputBox)
          target.appendChild(expansionBox)

          expansionBox.onclick = function () {
            console.log('텍스트 입력 창 띄우기')
          }

          /***************************
            썸네일에 위치 보이기
          ****************************/

          const thumbNailTarget = document.getElementsByClassName('thumbnail')[itemExpansion.targetPage - 1]
          const thumbNailAnnotationLayer = document.createElement('div')
          thumbNailAnnotationLayer.className = 'preview-annotation'
          thumbNailAnnotationLayer.style.position = 'absolute'
          thumbNailAnnotationLayer.style.width = '8px'
          thumbNailAnnotationLayer.style.height = '8px'
          thumbNailAnnotationLayer.style.borderRadius = '50%'
          thumbNailAnnotationLayer.style.background = 'purple'
          thumbNailAnnotationLayer.style.zIndex = 9
          thumbNailAnnotationLayer.style.left = itemExpansion.x / 10 + 'px'
          thumbNailAnnotationLayer.style.top = itemExpansion.y / 10.5 + 'px'

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
    columns: state.columns
  }
}

const actionCreators = {

}

export default connect(
  mapStateToProps,
  actionCreators
)(Expansions)
