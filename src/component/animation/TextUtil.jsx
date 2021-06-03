import React, { Component } from 'react'

class ButtonUtil extends Component {

  render() {

    return(
      <React.Fragment>
        <div>
          <p data-text="NOB" className="text-01">
            NOB
          </p>
        </div>

        <div>
          <p data-text="Neon Sign" className="text-02">
            Neon Sign
          </p>
        </div>

        <div>
          <p data-text="Move Move" className="text-03">
            Move Move
          </p>
        </div>

        <div>
          <p data-text="over-flip" className="text-04">
            over-flip
          </p>
        </div>

      </React.Fragment>
    )
  }
}

export default ButtonUtil
