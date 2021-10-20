import React, { Component } from 'react'

class TextUtil extends Component {

  render() {

    return(
      <React.Fragment>
        <div className="scroll-mandatory">
          <div className="scroll">
            <p data-text="펜디" className="text-01">
              펜디
            </p>
          </div>

          <div className="scroll">
            <p data-text="Neon Sign" className="text-02">
              Neon Sign
            </p>
          </div>

          <div className="scroll">
            <p data-text="Move Move" className="text-03">
              Move Move
            </p>
          </div>

          {/*<div className="scroll">*/}
          {/*  <p data-text="over-flip" className="text-04">*/}
          {/*    over-flip*/}
          {/*  </p>*/}
          {/*</div>*/}
        </div>

      </React.Fragment>
    )
  }
}

export default TextUtil
