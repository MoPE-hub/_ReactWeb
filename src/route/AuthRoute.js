import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthRoute = ({ component: Component, auth,  ...rest }) => (

  <Route {...rest} render={props => (
      auth.isLoggedIn
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)

export default AuthRoute
