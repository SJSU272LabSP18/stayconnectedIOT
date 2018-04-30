import React, { Component } from 'react';
import imagine from '../../assets/img/sidebar-3.jpg';
class Navbar extends Component {
  render() {
    return (
      <div className="container">
        <div className="sidebar" data-color="blue" data-image={imagine}>
          <div className="sidebar-wrapper" style={{ padding: '50px' }}>
            <div className="logo">
              <a href="/dashboard/sites" className="simple-text">
                <img
                  src="https://user-images.githubusercontent.com/10326883/36414375-e9339856-15d6-11e8-9bbd-035581f8416e.jpg"
                  style={{ height: '30px', width: '30px' }}
                />
                StayConnected
              </a>
            </div>

            <ul className="nav">
              <li className="active">
                <a href="/dashboard/sites">
                  <i className="pe-7s-graph" />
                  <p>Dashboard</p>
                </a>
              </li>
            </ul>
            <ul className="nav">
              <li className="active">
                <a href="/dashboard/sites">
                  <i className="pe-7s-map-marker" />
                  <p>Sites</p>
                </a>
              </li>
            </ul>
            <ul className="nav">
              <li className="active">
                <a href="/dashboard/locations">
                  <i className="pe-7s-note2" />
                  <p>Locations</p>
                </a>
              </li>
            </ul>
            <ul className="nav">
              <li className="active">
                <a href="/dashboard/zones">
                  <i className="pe-7s-science" />
                  <p>Zones</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default Navbar;
// <li className="active">
//   <a href="/dashboard/sites">
//     <p>Sites</p>
//   </a>
// </li>
// <li>
//   <a href="/dashboard/locations">
//     <p>Locations</p>
//     <br />
//   </a>
// </li>
// <li>
//   <a href="/dashboard/zones">
//     <p>Zones</p>
//     <br />
//   </a>
// </li>
