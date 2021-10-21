import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from "react-redux";

const MediaQuery = (props) => {

  return(
    <React.Fragment>
      <div className="description-box">
        <h4 className="title">@media 쿼리</h4>

        <span className="explain">html, css에서 사용되는 @media 쿼리는 처음 설정된 css보다 아래에 적어야 한다.</span>

        <span className="explain">아래처럼 적으면 적용이 안된다.</span>
        <div className="w-full">
          <pre>
            <code>
              {`
@media (max-width: 720px) {
  .title {
    padding: 10px;
  }
}
              
.title {
  padding: 20px;
  background: red;
} 
              `}
            </code>
          </pre>
        </div>

        <span className="explain">css는 위에서 아래로 읽어 내려가기 때문에 @media 쿼리를 사용해서 컨트롤 한다고 해도 그 밑에서 다른 속성을 적으면 그 속성을 읽어버린다. 주의하자.</span>

        <div className="w-full">
          <pre>
            <code>
              {`
.title {
  padding: 20px;
  background: red;
}

@media (max-width: 720px) {
  .title {
    padding: 10px;
  }
} 
              `}
            </code>
          </pre>
        </div>

        <span className="explain">위에 처럼 쓰는게 맞다. 그래서 보통은 @media 쿼리를 css파일 가장 아래에 적는다.</span>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  //
})

const actionCreators = {
  //
}

export default connect(
  mapStateToProps,
  actionCreators,
)(MediaQuery)
