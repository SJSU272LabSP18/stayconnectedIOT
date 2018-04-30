import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Zones from './Zones/Zones';
import LocationView from './Location';
import Sites from './Sites/Sites';
import Locations from './Locations/Locations';
import Navbar from '../Navbar/Navbar';
import Header from '../Header';
class Dashboard extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <div className="wrapper">
              <div className="main-panel">
                <Navbar />
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
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default Dashboard;
