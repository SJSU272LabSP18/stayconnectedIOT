import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Footer from './Footer/Footer';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container-fluid">
            <Header />
            <Route exact path="/" component={Landing} />
              <Route exact path="/Login" component={Login} />
            <Dashboard />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null, actions)(App);
