import React, { Component } from "react"

import PreViewer from "./PreViewer"
import Composer from "./Composer"
import Element from './editor'
import Viewer from './Viewer'

class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      //
    }
  }

  render() {
    return (
      <React.Fragment>
        <main className="canvas">
          <div className="content">
            <Viewer />
            <Composer />
            <Element />
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default Index
