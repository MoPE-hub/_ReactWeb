import React from "react"
import { connect } from 'react-redux'

const ThumbnailViewer = (props) => {

  const { controller } = props

  return (
    <React.Fragment>
      <div
        id="thumbnailView"
        className = {
          controller.isThumbnailOpen ? 'thumbContainer thumbnail-wrap  sidebar-open' : 'thumbContainer thumbnail-wrap'
        }
      >
      </div>
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
)(ThumbnailViewer)
