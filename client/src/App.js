import React, { Component } from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
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

import { Security, ImplicitCallback } from '@okta/okta-react';

const config = {
  issuer: 'https://dev-245467.okta.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oakxadtiXPNoX9id356'
}

class App extends Component {
  persistConfig = configureStore();

  render() {
    console.log(process.env);
    return (
      <Provider store={this.persistConfig.store}>
        <PersistGate loading={null} persistor={this.persistConfig.persistor}>
            <BrowserRouter>
              <React.Fragment>
                <Security issuer={config.issuer}
                          client_id={config.client_id}
                          redirect_uri={config.redirect_uri}
                >
                  <NavBar/>
                  <Route exact path='/' component={Home}/>
                  <Route exact path='/resolve' component={Resolve}/>
                  <Route exact path='/hrpage' component={HRPanelPage}/>
                  <Route path='/implicit/callback' component={ImplicitCallback}/>
                  <Footer/>
                </Security>
              </React.Fragment>
            </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
