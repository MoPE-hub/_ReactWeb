import React, { useState, useEffect } from 'react';
import Route from './route'
import FixBackground from "./assets/images/bg-fix.png";
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
// import {createTodo as createTodo, deleteTodo as deleteTodo} from './graphql/mutations';

function App() {

  return (
    <div className="App">
      <Route />
      <img src={FixBackground} alt="배경" className="background-img"/>
      {/*<AmplifySignOut />*/}
    </div>
  );
}

export default App;
// export default withAuthenticator(App);