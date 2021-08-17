import React from 'react'

const Main = () => {

  const target = document.getElementsByClassName('open-test')

  const isOpen = () => {
    target[0].style.height = "400px"
  }

  return(
    <React.Fragment>
      <div className="wrap">
        <div className="main">
          {/*<p data-text="어서오세요~" className="info-text-01">*/}
            미완성된 사이트입니다.
          {/*</p>*/}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Main
