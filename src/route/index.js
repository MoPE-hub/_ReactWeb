import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import history from './history'

////////// defalut //////////
import Header from '../component/default/Header'
import Footer from '../component/default/Footer'

////////// component //////////
import Main from '../component/Index'

const Routes = ({ auth }) => {
  return (

    <Router
      history={history}
    >
      <Header />

      <Switch>
        <Route exact path="/" component={Main}/>
      </Switch>

      <Footer />

    </Router>

  )
}

// const mapStateToProps = state => ({
//   auth: state.auth,
// })
//
// export default withRouter(Routes)

export default Routes
