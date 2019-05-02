import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './Components/redux/configureStore';

import Home from './Components/Home';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import Resolve from './Components/Resolve';

import './App.css';
class App extends Component {
  persistConfig = configureStore();

  componentDidMount() {
    try {
      var query = queryString.parse(this.props.location.search);
      if (query.id) {
        axios.post('http://localhost:3001/auth/find-by-google-id', { google_id: query.id })
          .then(res => {
            let { token, user } = res.data;
            this.props.userLoggedIn({ 
              user,
              token
            });
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            this.props.history.push("/");
          });
      }
    }
    catch(err) {
      console.log(err);
    }
  }

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
