import React, { Component } from "react"
import { connect } from 'react-redux'
import { loaderActions, controllerActions } from '../store/actions'

class CompleteViewer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      //
    }
  }

  render() {

    return (
      <React.Fragment>
      {
         this.props.loaded ?

           <div
             id="viewerContainer"
             className="viewerContainer pdf-wrap"
           >
             <div
               id="viewer"
               className="pdfViewer pdf-inner"
             >
             </div>
           </div>
         : ''
      }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    component: state.component,
  }
}

const actionCreators = {

}

export default connect(
  mapStateToProps,
  actionCreators
)(CompleteViewer)
