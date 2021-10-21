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
import HTMLMain from '../component/study/html'

////////// css //////////
import CssMain from '../component/study/css'
import MediaQuery from '../component/study/css/MediaQuery'

////////// javascript //////////
import JavaScriptMain from '../component/study/javascript'

////////// react //////////
import ReactMain from '../component/study/react'
import ReduxPersist from '../component/study/react/ReduxPersist'

////////// vue //////////
import VueMain from '../component/study/vue'

////////// react-native //////////
import ReactNativeMain from '../component/study/react-native'

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
        '/css/1',

        // JavaScript

        // React
        '/react/1',

        // Vue

        // React-Native

      ]}>
        <SubLayout>
          <Switch>

            <Route exact path="/html" component={HTMLMain} />
            <Route exact path="/css" component={CssMain} />
            <Route exact path="/javascript" component={JavaScriptMain} />
            <Route exact path="/react" component={ReactMain} />
            <Route exact path="/vue" component={VueMain} />
            <Route exact path="/react-native" component={ReactNativeMain} />

            {/* HTML */}

            {/* CSS */}
            <Route exact path="/css/1" component={MediaQuery} />

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
