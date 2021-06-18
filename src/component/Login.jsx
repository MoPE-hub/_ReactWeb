import React, { useState } from 'react';

// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

const Login = (props) => {

  const [ state, setState ] = useState({})

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    const { userId, password } = state

    props.logIn(
      userId,
      password
    )
  }

  return (
    <React.Fragment>
      <div className="login-wrap">
        <form name="form" onSubmit={handleSubmit}>
          <fieldset>

            <div>
              <span className="login-title">아이디 테스트</span>
              <input
                type="text"
                id="userId"
                name="userId"
                value={state.userId}
                className=""
                // placeholder="아이디"
                onChange={(e) => handleChange(e)}
                required={true}
              />
            </div>

            <div>
              <span className="login-title">비밀번호</span>
              <input
                type="password"
                id="password"
                name="password"
                value={state.password}
                className=""
                onChange={(e) => handleChange(e)}
                required={true}
              />
            </div>

          </fieldset>

          <button className="login-btn">로그인</button>
        </form>




        {/*<AmplifySignOut />*/}
      </div>
    </React.Fragment>
  )
}

export default Login;
// export default withAuthenticator(Login);