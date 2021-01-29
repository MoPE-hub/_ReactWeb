import React from 'react'
import { connect } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'

/*************
    LayOut
*************/

import DefaultLayout from '../layout/DefaultLayout'

/*************
    Component
*************/

import Auth from '../component/auth/'
import Agree from '../component/agree/'
import Canvas from '../component/'

const Routes = ({ auth }) => {
  return (
    <Router
      history={history}
    >
      <Route exact path='/auth' component={Auth} />
      <Route exact path='/agree' component={Agree} />

      <Switch>
        <Route exact path={[
          '/'
        ]}>
          <DefaultLayout>
            <Switch>
              <Route exact path='/' component={Canvas} />
            </Switch>
          </DefaultLayout>
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes
