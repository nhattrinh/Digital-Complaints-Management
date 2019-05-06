import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './components/redux/configureStore';

import Home from './components/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Resolve from './components/Resolve';
import HRPanelPage from './components/HRPanelPage'

import './App.css';
class App extends Component {
  persistConfig = configureStore();

  render() {
    return (
      <Provider store={this.persistConfig.store}>
        <PersistGate loading={null} persistor={this.persistConfig.persistor}>
          <React.Fragment>
            <NavBar/>
            <BrowserRouter>
              <React.Fragment>
                <Route exact path='/' component={Home}/>
                <Route exact path='/resolve' component={Resolve}/>
                <Route exact path='/hrpage' component={HRPanelPage}/>
              </React.Fragment>
            </BrowserRouter>
            <Footer/>
          </React.Fragment>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
