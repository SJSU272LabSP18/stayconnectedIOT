import React, {Component} from "react";
import imagine from "../../assets/img/sidebar-3.jpg";
import cookie from "react-cookies";
import {handleLogin} from "../../actions";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

var firebase = require('firebase');

class Navbar extends Component {
    constructor(props) {
        super(props);

    }

    state = {
        authUser: cookie.load('isLoggedIn')&& false
    };

        handleLogin(){
        let accessToken;
        //  this.props.fetchLogin = this.props.fetchLogin.bind(this);
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result, error) => {
            if(error){
                console.log("In Login With Google Error!!")
            }else{
                accessToken = result.credential.accessToken;
                cookie.save('isLoggedIn', 'true', { path: '/' });
                console.log('access token ' +accessToken);
                if(accessToken!= null){
                    console.log('After fetch');
                    this.props.handleLogin(true);
                      //  .then((response) => {
                            // store the userid in local storage
                            // this.setState({
                            //     //     usersData: users
                            //     // });
                      //      console.log('After');
                        //});
                    this.setState({
                        authUser: true
                    });
                    this.props.history.push('/Locations');
                }
            }
        }).catch(function(error) {
            console.log(error);
            // this.setState({
            //     message: 'Not a authorized user'
            // });
        });

    }
    handleNavBarHide=()=>
    {

    }

  render() {
        console.log('state ' +this.state.authUser);
        var auth=(this.props.auth ? this.props.auth: this.state.authUser);
        if(auth===null){
            auth=false;
        }
      switch (auth){
          case false:
            return(
                <div className="container">
                    <div className="sidebar" data-color="blue" data-image={imagine}>
                        <div className="sidebar-wrapper" style={{ padding: '50px' }}>
                            <div className="nav" id="nav-logo">
                                <a href="/" style={{ color: '#FFF' }}>
                                    <img
                                        src="https://user-images.githubusercontent.com/10326883/36414375-e9339856-15d6-11e8-9bbd-035581f8416e.jpg"
                                        style={{ height: '30px', width: '30px' }}
                                    />
                                    {'   '}
                                    StayConnected
                                </a>
                            </div>
                            <br />
                            <div className="nav" id="nav-dashboard">
                                <a onClick={this.handleLogin.bind(this)} style={{ color: '#FFF' }}>
                                    <i className="pe-7s-map-marker" />
                                    Login
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
                );
            break;
          case undefined:
              return(
                  <div className="container">
                      <div className="sidebar" data-color="blue" data-image={imagine}>
                          <div className="sidebar-wrapper" style={{ padding: '50px' }}>
                              <div className="nav" id="nav-logo">
                                  <a href="/" style={{ color: '#FFF' }}>
                                      <img
                                          src="https://user-images.githubusercontent.com/10326883/36414375-e9339856-15d6-11e8-9bbd-035581f8416e.jpg"
                                          style={{ height: '30px', width: '30px' }}
                                      />
                                      {'   '}
                                      StayConnected
                                  </a>
                              </div>
                              <br />


                          </div>
                      </div>
                  </div>
              );
              break;
          case true:
              return (

                  <div className="container">
                      <div className="sidebar" data-color="blue" data-image={imagine}>
                          <div className="sidebar-wrapper" style={{ padding: '50px' }}>
                              <div className="nav" id="nav-logo">
                                  <a href="/" style={{ color: '#FFF' }}>
                                      <img
                                          src="https://user-images.githubusercontent.com/10326883/36414375-e9339856-15d6-11e8-9bbd-035581f8416e.jpg"
                                          style={{ height: '30px', width: '30px' }}
                                      />
                                      {'   '}
                                      StayConnected
                                  </a>
                              </div>
                              <br />

                              <div className="nav" id="nav-dashboard" >
                                  <a href="/dashboard/sites" style={{ color: '#FFF' }}>
                                      <i className="pe-7s-map-marker" />
                                      Sites
                                  </a>
                              </div>

                              <div className="nav" id="nav-dashboard">
                                  <a href="/dashboard/locations" style={{ color: '#FFF' }}>
                                      <i className="pe-7s-note2" />
                                      Locations
                                  </a>
                              </div>

                              <div className="nav" id="nav-dashboard">
                                  <a href="/dashboard/zones" style={{ color: '#FFF' }}>
                                      <i className="pe-7s-science" />
                                      Zones
                                  </a>
                              </div>

                              <div className="nav" id="nav-dashboard">
                                  <a href="/dashboard/nodes" style={{ color: '#FFF' }}>
                                      <i className="pe-7s-graph" />
                                      Nodes
                                  </a>
                              </div>


                              <div className="nav" id="nav-dashboard" onClick={(event) => {
                                  this.props.handleLogin(false);
                              }}>
                                      <i className="pe-7s-note2" />
                                      Logout

                              </div>
                          </div>
                      </div>
                  </div>
              );
              break;
      }

  }
}
function mapStateToProps(state) {
    return {
        auth:state.auth
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({handleLogin: handleLogin}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Navbar);
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
