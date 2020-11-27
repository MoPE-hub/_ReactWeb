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
            <Route path='/' component={Blue} />
            <Route path='main' component={Main} />
            </Switch>
        </Router>
    );
}

export default Routes;