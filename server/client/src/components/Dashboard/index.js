import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Zones from './Zones/Zones';
import LocationView from './Location';
import Sites from './Sites/Sites';
import Nodes from './Nodes/Nodes';
import Locations from './Locations/Locations';
import Navbar from '../Navbar/Navbar';
import Header from '../Header';
import * as firebase from "../firebase";
import cookie from 'react-cookies'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: false,
        };
    }

    componentDidMount() {
        this.setState({
            authUser: cookie.load('isLoggedIn')
        })
        console.log('cookie index ' +this.state.authUser);
        // firebase.auth.onAuthStateChanged(authUser => {
        //     authUser
        //         ? this.setState(() => ({ authUser :true }))
        //         : this.setState(() => ({ authUser: false }));
        // });
    }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <div className="wrapper">
              <div className="main-panel">
                <Navbar authUser={this.state.authUser}/>
                <Route exact path="/dashboard/sites" component={Sites} />
                <Route exact path="/dashboard/zones" component={Zones} />
                <Route
                  exact
                  path="/dashboard/locations/:locationId/zones"
                  component={Zones}
                />
                <Route
                  exact
                  path="/dashboard/:siteId/locations"
                  component={Locations}
                />
                <Route
                  exact
                  path="/dashboard/locations"
                  component={Locations}
                />
                <Route
                  exact
                  path="/dashboard/zones/:zoneId/nodes"
                  component={Nodes}
                />
                <Route exact path="/dashboard/nodes" component={Nodes} />
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default Dashboard;
