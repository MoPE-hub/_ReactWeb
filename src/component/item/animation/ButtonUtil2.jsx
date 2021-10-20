import React, { Component } from 'react'

class ButtonUtil2 extends Component {

  render() {

    return(
      <React.Fragment>
        <section className="buttons-1">
          <div className="container">

            <a href="#" className="btn btn-1">
              <svg>
                <rect x="0" y="0" fill="none" width="100%" height="100%"/>
              </svg>
              Hover
            </a>
            {/*arrowRight hover inspired by https://codepen.io/karimbalaa/pen/qERbBY?editors=110*/}

            <a href="/" className="btn btn-2">Hover</a>

            <a href="/" className="btn btn-3">Hover</a>

            <a href="/" className="btn btn-4"><span>Hover</span></a>

            <a href="/" className="btn btn-5">Hover</a>

          </div>
          {/*<p>Follow on <a href="https://twitter.com/Dave_Conner" target="_blank">출처 :: Twitter</a></p>*/}
        </section>

        <section className="buttons-2">

          <div className="container">
            <div className="button">Center -> out</div>
            <div className="button">Left -> Right -> Left</div>
            <div className="button">Left -> Right -> Right</div>
            <div className="button">Top -> Bottom -> Top</div>
            <div className="button">Skew Fill Left -> Right</div>
            {/*<div class="button">Flex Grow</div>*/}
            <div className="button">Rounded Corners</div>
            <div className="button">Scale</div>
            <div className="button">Border (Inner Shadow)</div>
            <div className="button">Border (Outer Shadow)</div>
          </div>

        </section>

        <section className="buttons-3">

          <div className="container">
            <button className="fill">Fill In</button>
            <button className="pulse">Pulse</button>
            <button className="close">Close</button>
            <button className="raise">Raise</button>
            <button className="up">Fill Up</button>
            <button className="slide">Slide</button>
            <button className="offset">Offset</button>
          </div>

        </section>

        {/*<section className="buttons-4">*/}

        {/*  <h1>SVG Interaction</h1>*/}
        {/*  <div className="icons">*/}
        {/*    <arrowRight*/}
        {/*      width="300"*/}
        {/*      height="300"*/}
        {/*      viewBox="0 0 32 42"*/}
        {/*      xmlns="http://www.w3.org/2000/svg"*/}
        {/*      onClick="this.classList.toggle('active')"*/}
        {/*    >*/}
        {/*      <g transform="matrix(1,0,0,1,-389.5,-264.004)">*/}
        {/*        <g id="arrow_left2">*/}
        {/*          <g transform="matrix(1,0,0,1,0,5)">*/}
        {/*            <path*/}
        {/*              id="top"*/}
        {/*              d="M390,270L420,270L420,270C420,270 420.195,250.19 405,265C389.805,279.81 390,279.967 390,279.967"*/}
        {/*            />*/}
        {/*          </g>*/}
        {/*          <g*/}
        {/*            transform="matrix(1,1.22465e-16,1.22465e-16,-1,0.00024296,564.935)"*/}
        {/*          >*/}
        {/*            <path*/}
        {/*              id="bottom"*/}
        {/*              d="M390,270L420,270L420,270C420,270 420.195,250.19 405,265C389.805,279.81 390,279.967 390,279.967"*/}
        {/*            />*/}
        {/*          </g>*/}
        {/*          <path id="middle" d="M390,284.967L420,284.967"/>*/}
        {/*        </g>*/}
        {/*      </g>*/}
        {/*    </arrowRight>*/}
        {/*    <arrowRight*/}
        {/*      width="300"*/}
        {/*      height="300"*/}
        {/*      viewBox="0 0 32 42"*/}
        {/*      xmlns="http://www.w3.org/2000/svg"*/}
        {/*      onClick="this.classList.toggle('active')"*/}
        {/*    >*/}
        {/*      <g transform="matrix(1,0,0,1,-438.286,-264.004)">*/}
        {/*        <g id="arrow_left1">*/}
        {/*          <g*/}
        {/*            transform="matrix(-1,-1.22465e-16,1.22465e-16,-1,858.787,564.935)"*/}
        {/*          >*/}
        {/*            <path*/}
        {/*              id="top"*/}
        {/*              d="M390,270L420,270L420,270C420,270 420.195,250.19 405,265C389.805,279.81 390,279.967 390,279.967"*/}
        {/*            />*/}
        {/*          </g>*/}
        {/*          <g transform="matrix(-1,-2.44929e-16,-2.44929e-16,1,858.786,5)">*/}
        {/*            <path*/}
        {/*              id="bottom"*/}
        {/*              d="M390,270L420,270L420,270C420,270 420.195,250.19 405,265C389.805,279.81 390,279.967 390,279.967"*/}
        {/*            />*/}
        {/*          </g>*/}
        {/*          <g*/}
        {/*            transform="matrix(-1,-1.22465e-16,1.22465e-16,-1,858.787,569.935)"*/}
        {/*          >*/}
        {/*            <path id="middle" d="M390,284.967L420,284.967"/>*/}
        {/*          </g>*/}
        {/*        </g>*/}
        {/*      </g>*/}
        {/*    </arrowRight>*/}
        {/*    <arrowRight*/}
        {/*      width="265"*/}
        {/*      height="265"*/}
        {/*      viewBox="0 0 36 22"*/}
        {/*      xmlns="http://www.w3.org/2000/svg"*/}
        {/*      onClick="this.classList.toggle('active')"*/}
        {/*    >*/}
        {/*      <g transform="matrix(1,0,0,1,-419.5,-274.131)">*/}
        {/*        <g id="arrow_rocket">*/}
        {/*          <path*/}
        {/*            id="top"*/}
        {/*            d="M420,274.631L450,274.631C450,274.631 459.044,284.599 450,284.599C440.956,284.599 420,284.646 420,284.646L430.014,274.631"*/}
        {/*          />*/}
        {/*          <g transform="matrix(1,-1.22465e-16,-1.22465e-16,-1,0,569.277)">*/}
        {/*            <path*/}
        {/*              id="bottom"*/}
        {/*              d="M420,274.631L450,274.631C450,274.631 459.044,284.599 450,284.599C440.956,284.599 420,284.646 420,284.646L430.014,274.631"*/}
        {/*            />*/}
        {/*          </g>*/}
        {/*          <g transform="matrix(1,0,0,1,0,-0.0234189)">*/}
        {/*            <path id="middle" d="M420,284.646L450,284.646"/>*/}
        {/*          </g>*/}
        {/*        </g>*/}
        {/*      </g>*/}
        {/*    </arrowRight>*/}
        {/*  </div>*/}

        {/*</section>*/}
        <h4 className="text-center m-t-20">참고 및 출처 : CodePen</h4>

      </React.Fragment>
    )
  }
}

export default ButtonUtil2
