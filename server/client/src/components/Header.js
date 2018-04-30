import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//require('../assets/css/header.css');

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
      <div className="main-panel">
        <nav className="navbar navbar-default navbar-fixed">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href="#">
                Dashboard
              </a>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-left">
                <li>
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <i className="fa fa-dashboard" />
                  </a>
                </li>
              </ul>

              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="">Account</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      // <div className="main-panel">
      //   <nav className="navbar navbar-default navbar-fixed">
      //     <div className="container-fluid">
      //       <div className="navbar-header">
      //         <button
      //           type="button"
      //           className="navbar-toggle"
      //           data-toggle="collapse"
      //         >
      //           <span className="sr-only">Toggle navigation</span>
      //           <span className="icon-bar" />
      //           <span className="icon-bar" />
      //           <span className="icon-bar" />
      //         </button>
      //         <a className="navbar-brand" href="#">
      //           Dashboard
      //         </a>
      //       </div>
      //       <div className="collapse navbar-collapse">
      //         <ul className="nav navbar-nav navbar-left">
      //           <li>
      //             <a
      //               href="#"
      //               className="dropdown-toggle"
      //               data-toggle="dropdown"
      //             >
      //               <i className="fa fa-dashboard" />
      //             </a>
      //           </li>
      //         </ul>
      //
      //         <ul className="nav navbar-nav navbar-right">
      //           <li>{this.renderContent()}</li>
      //         </ul>
      //       </div>
      //     </div>
      //   </nav>
      // </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);
