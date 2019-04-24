import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Resolve from './components/Resolve';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar/>
        <BrowserRouter>
          <React.Fragment>
            <Route exact path='/' component={Home}/>
            <Route exact path='/resolve' component={Resolve}/>
          </React.Fragment>
        </BrowserRouter>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default App;
