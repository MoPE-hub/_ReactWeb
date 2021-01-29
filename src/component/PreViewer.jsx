import React, { Component } from "react"
import { connect } from 'react-redux'
import { loaderActions, controllerActions } from '../store/actions'

import pdfjs from 'pdfjs-dist'
import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer'

import TextBoxes from './editor/signer/TextBoxes'
import CheckBoxes from './editor/signer/CheckBoxes'
import SignPads from './editor/signer/SignPads'
import Signs from './editor/signer/Signs'
import Expansions from './editor/signer/Expansions'

class PreViewer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      //
    }
  }

  componentDidMount() {
    const originTargets = document.getElementsByClassName('react-draggable')
    const originTargetsArray = Array.from(originTargets)

    originTargetsArray.map((item, index) => {
      const target = item.getElementsByClassName('drag-component')[0]
      target.classList.add('drag-component-hidden')
      target.classList.remove('drag-component')
    })
  }

  componentWillUnmount() {
    const targets = document.getElementsByClassName('preview-annotation')
    const targetsArray = Array.from(targets)

    targetsArray.map((item, index) => (
      item.remove()
    ))

    const originTargets = document.getElementsByClassName('react-draggable')
    const originTargetsArray = Array.from(originTargets)

    originTargetsArray.map((item, index) => {
      const target = item.getElementsByClassName('drag-component-hidden')[0]
      target.classList.add('drag-component')
      target.classList.remove('drag-component-hidden')
    })
  }

  render() {
    return (
      <React.Fragment>
        <TextBoxes />
        <CheckBoxes />
        <SignPads />
        <Signs />
        <Expansions />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

const actionCreators = {

}

export default connect(
  mapStateToProps,
  actionCreators
)(PreViewer)
