import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Resolve from './Components/Resolve';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <BrowserRouter>
          <div id='routes'>
            <Route exact path='/' component={Home}/>
            <Route exact path='/resolve' component={Resolve}/>
          </div>
        </BrowserRouter>
        
        <Footer/>
      </div>
    );
  }
}

export default App;
