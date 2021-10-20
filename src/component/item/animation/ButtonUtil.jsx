import React, { Component } from 'react'

class ButtonUtil extends Component {

  render() {

    return(
      <React.Fragment>
        <section className="ani-box-1">
          <div className="text-box">
            <div>
              <div className="bounce-h">Bounce</div>
            </div>
            <div>
              <div className="pulse-h">Pulse</div>
            </div>
            <div>
              <div className="rubberband-h">Rubberband</div>
            </div>
            <div>
              <div className="shake-h">Shake</div>
            </div>
            <div>
              <div className="hinge-h">Hinge</div>
            </div>
            <div>
              <div className="yflip-h">Flip</div>
            </div>
            <div>
              <div className="no-namex-h">No-NameX</div>
            </div>
            <div>
              <div className="no-namey-h">No-NameY</div>
            </div>
            <div>
              <div className="radius-h">borderRadius</div>
            </div>
            <div>
              <div className="hinge-x-drop-h">hingeXdrops</div>
            </div>
          </div>

          <div className="flip-text-box">
            <br/>
            <div className="flip">
              <div>
                <div className="nonamex animation">No-Name</div>
              </div>
              <div>
                <div className="pulse animation">Pulse</div>
              </div>
              <div>
                <div className="rubberband animation">Rubberband</div>
              </div>
              <div>
                <div className="shake animation">Shake</div>
              </div>
              <div>
                <div className="hinge animation">Hinge</div>
              </div>
              <div>
                <div className="yflip animation">Flip</div>
              </div>
            </div>
          </div>
          <h4 className="text-center m-t-20">참고 : CodePen</h4>
        </section>

      </React.Fragment>
    )
  }
}

export default ButtonUtil
