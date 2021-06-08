import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import history from './history'

////////// defalut //////////
import Header from '../component/default/Header'
import Footer from '../component/default/Footer'

////////// component //////////
import Index from '../component/Index'
import Portfolio from '../component/Portfolio'
import Animation from '../component/Animation'

////////// component //////////
import Login from '../component/Login.jsx'

const Routes = ({ auth }) => {
  return (

    <Router
      history={history}
    >
      <Header />

      <Switch>
        {/*<Route exact path="/" component={Index} />*/}
        <Route exact path="/" component={Login} />
        <Route exact path="/portfolio" component={Portfolio} />
        <Route exact path="/util" component={Animation} />
      </Switch>

      {/*<Footer />*/}

    </Router>

  )
}

// const mapStateToProps = state => ({
//   auth: state.auth,
// })
//
// export default withRouter(Routes)

export default Routes
