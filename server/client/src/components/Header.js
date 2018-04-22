import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
require('../css/header.css');

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google"> Login With Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }
  render() {
    return (
      <div className="headertext">
        <nav
          className="navbar navbar-light"
          style={{ background: '#0d0d26', height: 60 }}
        >
          <Link
            to={this.props.auth ? '/dashboard' : '/'}
            className="left brand-logo "
          >
            StayConnected
          </Link>

          <Link to="/app/location/dashboard">Dashboard</Link>

          <ul className="right">
            {this.renderContent()}
          </ul>
        </nav>
        <br />
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);
