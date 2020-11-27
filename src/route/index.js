import React from 'react'
import { Router, Route , Switch } from 'react-router-dom'
import history from './history'
import Main from '../component/Main'
import Blue from '../component/Blue'

const Routes = ({ auth }) => {
    return(
        <Router
            history={history}
        >
            <Switch>
            <Route exact path='/' component={Blue} />
            <Route exact path='/main' component={Main} />
            </Switch>
        </Router>
    );
}

export default Routes;