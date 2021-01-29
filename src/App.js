import React, {Component} from 'react';
import Routes from './route/index';
import Header from './component/Header';
import Footer from './component/Footer';
import './assets/Main.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Header />
        <Routes />
        <Footer />
      </div>
  );
  }
}

export default App;
