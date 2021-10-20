import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'

import history from './history'

////////// defalut //////////
import Header from '../component/default/Header'
import Footer from '../component/default/Footer'
import DefaultLayout from "../layout/DefaultLayout";
import SubLayout from "../layout/SubLayout";

////////// component //////////
import Index from '../component/Index'
import Portfolio from '../component/Portfolio'
import Animation from '../component/item/Animation'
import QnA from '../component/qna/QnA'
import Introduce from '../component/IntroduceBox'

////////// html //////////
import Html1 from '../component/study/html/Html1'

////////// css //////////
// import Css from '../component/study/html/Html1'

////////// javascript //////////
// import JavaScript from '../component/study/javascript//Html1'

////////// react //////////
import ReactMain from '../component/study/react'
import ReduxPersist from '../component/study/react/ReduxPersist'

////////// vue //////////
// import Vue from '../component/study/html/Html1'

////////// react-native //////////
// import ReactNative from '../component/study/html/Html1'

const Routes = ({ auth }) => {
  return (

    <Router
      history={history}
    >

      <Route exact path={[
        '/',
        '/intro',
        '/portfolio',
        '/util',
        '/qna'
      ]}>
        <DefaultLayout>
          <Switch>

            <Route exact path="/" component={Index} />
            <Route exact path="/intro" component={Introduce} />
            {/*<Route exact path="/" component={Login} />*/}
            <Route exact path="/portfolio" component={Portfolio} />
            <Route exact path="/util" component={Animation} />
            <Route exact path="/qna" component={QnA} />
          </Switch>
        </DefaultLayout>
      </Route>

      {/*<Footer />*/}

      <Route path={[
        '/html',
        '/css',
        '/javascript',
        '/react',
        '/vue',
        '/react-native',

        // HTML

        // CSS

        // JavaScript

        // React
        '/react/1',

        // Vue

        // React-Native

      ]}>
        <SubLayout>
          <Switch>

            <Route exact path="/html" component={Html1} />
            <Route exact path="/css" component={Html1} />
            <Route exact path="/javascript" component={Html1} />
            <Route exact path="/react" component={ReactMain} />
            <Route exact path="/vue" component={Html1} />
            <Route exact path="/react-native" component={Html1} />

            {/* HTML */}

            {/* CSS */}

            {/* JavaScript */}

            {/* React */}

            <Route exact path="/react/1" component={ReduxPersist} />

            {/* Vue */}

            {/* React-Native */}

          </Switch>
        </SubLayout>
      </Route>

    </Router>



  )
}

const mapStateToProps = state => ({
  auth: state.auth,
})

// export default withRouter(Routes)

export default Routes
