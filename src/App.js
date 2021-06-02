import React from 'react'
import Route from './route'
import FixBackground from "./assets/images/bg-fix.png";

function App() {
  return (
    <div className="App">
      <Route />
      <img src={FixBackground} alt="배경" className="background-img"/>
    </div>
  );
}

export default App;
