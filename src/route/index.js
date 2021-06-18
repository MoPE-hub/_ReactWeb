import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import history from './history'

////////// defalut //////////
import Header from '../component/default/Header'
import Footer from '../component/default/Footer'
import DefaultLayout from "../layout/DefaultLayout";

////////// component //////////
import Index from '../component/Index'
import Portfolio from '../component/Portfolio'
import Animation from '../component/Animation'
import QnA from '../component/qna/QnA'

const Routes = ({ auth }) => {
  return (

    <Router
      history={history}
    >
      <DefaultLayout>
        <Switch>
          <Route exact path="/" component={Index} />
          {/*<Route exact path="/" component={Login} />*/}
          <Route exact path="/portfolio" component={Portfolio} />
          <Route exact path="/util" component={Animation} />
          <Route exact path="/qna" component={QnA} />
        </Switch>
      </DefaultLayout>

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
