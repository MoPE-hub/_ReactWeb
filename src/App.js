import React from 'react';
import './App.css';
import Route from './route'
import FixBackground from "./assets/images/bg-fix.png";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    <div className="App">
      <div className="App">
        <Route />
        <img src={FixBackground} alt="배경" className="background-img"/>
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);