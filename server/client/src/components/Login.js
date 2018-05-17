import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {fetchUser} from "../actions";
var firebase = require('firebase');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersData: '',
            message:''
        }
    }

    handleLogin(){
        alert('in login');
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            console.log('result '+JSON.stringify(result.user));
            this.props.fetchLogin(result.credential.accessToken).then((users) => {
                this.setState({
                    usersData: users
                });
            });
            // ...
        }).catch(function(error) {
            console.log(error.credential);
            this.setState({
                message: 'Not a authorized user'
            });
        });
    }

    render() {
        return (
            <div>
                <div className="row container">
            <h1> Welcome </h1>
               hee this is a website welcomne to app <button onClick={()=>this.handleLogin()}
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

export default connect(mapStateToProps, { fetchUser })(withRouter(Login));
