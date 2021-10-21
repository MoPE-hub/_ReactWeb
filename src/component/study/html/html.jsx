import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from "react-redux";

const Html1 = (props) => {

  return(
    <React.Fragment>
      <div className="description-box">
        <h4 className="title">HTML구조 어떻게...</h4>

        <span className="explain">
          간혹가다가 나에게 연락해서 뭐가 안된다.. 된다.. 왜 되는거냐.. 이렇게 이야기 하면서 질문하는 사람들이 좀 있다..
          <br />
          그래서 코드를 달라고 해서 보거나 뭐 개발자 메뉴로 보면 대부분 구조 문제다..
          <br />
          구조만 잘짜면 css코드가 수십줄이 줄어드는 마법을 볼 수 있다.
          <br />
          그만큼 유지보수도 쉬워지고..
          <br />
          언제까지 absolute 이런거로 끼워맞출 생각인가..
        </span>

        <span className="explain">말도 안되는 거지만 진짜 가끔가다가 이런 사람이 있다.</span>

        <div className="w-full">
          <pre>
            <code>
              {`
<html>
  <head>
    <title>타이틀</title>
  </head>
  
  <body>
    <div class="header">
      <ul>
        <li>메뉴1</li>
        <li>메뉴2</li>
        <li>메뉴3</li>
      </ul>
      <img alt="이미지" />
    </div>
  </body>
</html>
              `}
            </code>
          </pre>
        </div>

        <span className="explain">
          다 생략하고 정말 간단히 작성한 코드이다.
          <br />
          헤더에 메뉴 리스트와 이미지가 있는데 이지미를 왼쪽에 두고 메뉴를 오른쪽에 두고 싶은데 어떻게 해야하냐.
          <br />
          코드는 이렇게 생겼다. 하면서 저런식의 코드를 주는 사람도 있다.
        </span>

        <span className="explain">HTML이라는 것에 대해 그냥 생긴 것만 본 것 같다.</span>

        <span className="explain">각 태그는 display속성을 가지고 있다. 이 속성에 따라서 오른쪽으로 태그가 생성될지 아래로 태그가 생성될지가 정해진다.</span>

        <span className="explain">위에 나온대로 이미지가 왼쪽 메뉴가 오른쪽이고 싶다면 아래와 같이 쓰고 css를 이용해서 display 속성을 수정해주면 된다.</span>

        <div className="w-full">
          <pre>
            <code>
              {`
<html>
  <head>
    <title>타이틀</title>
  </head>

  <body>
    <img alt="이미지"/>
    <div className="header">
      <ul>
        <li>메뉴1</li>
        <li>메뉴2</li>
        <li>메뉴3</li>
      </ul>
    </div>
  </body>
</html>
            `}
            </code>
          </pre>
        </div>

        <span className="explain">
          결론 태그는 display 속성에 따라서 왼쪽에서 오른쪽으로 위에서 아래로 생성된다.
          <br />
          이외에 구조를 어떻게 해야하냐. 어떻게 묶는게 좋으냐. 이런거는 경험이라고 생각된다.
          <br />
          많이 만들어보자.
        </span>

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
)(Html1)
