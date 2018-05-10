import React, { Component } from 'react';
import {auth} from './firebase';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {fetchLogin} from "../actions";
import cookie from 'react-cookies';

var firebase = require('firebase');

class Login extends Component{
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            usersData: '',
            message:''
        }
    }

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
                this.props.fetchLogin(accessToken)
                    .then((response) => {
                        // store the userid in local storage
                        // this.setState({
                        //     //     usersData: users
                        //     // });
                        console.log('After');
                });
            }
        }).catch(function(error) {
            console.log(error);
            // this.setState({
            //     message: 'Not a authorized user'
            // });
        });

    }

    render() {
        return (
            <div>
                <div className="row container">
            <h1> Welcome </h1>
               hee this is a website welcomne to app <button onClick={this.handleLogin.bind()}
                    type="button"
                    className="navbar-toggle"
                        data-toggle="collapse" value="Google Login">Login </button>
                </div>
            </div>

        )
    }
}
function mapStateToProps({ users }) {
    console.log(users);
    return { users };
}
export default connect(mapStateToProps, { fetchLogin })(withRouter(Login));
