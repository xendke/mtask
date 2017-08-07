import React, { Component } from 'react';
import { Redirect } from 'react-router'

import TopBar from 'components/TopBar.jsx'
import LoginForm from 'containers/LoginForm';

import * as firebase from "firebase";

class Login extends Component {
  state = {
    logged: false,
    showError: false,
    emailError: ""
  }

  handleLogin = (email, password) => {
    this.setState({emailError: "", showError: false});
    //var handleLoginError = this.handleLoginError;
    //var that = this; // wow
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((something) => {
      this.setState({logged: true});
    }).catch((error) => {
      //handleLoginError(error);
      console.log(error);
      if(error.code === "auth/invalid-email") {
        this.setState({emailError: "Invalid Email", showError: true});
      } else {
        this.setState({showError: true});
      }
    });
  }
  // TODO: firebase stuff can go in componentdidmount
  componentDidMount() { // redirect to app if logged
    this.unsubscribeAuth = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //this.user = user;
        this.setState({logged: true});
      } else {

      }
    });
  }
  componentWillUnmount() { // stop listening when the component is not mounted
    this.unsubscribeAuth();
  }
  render() {
    return (
      <div className="App">
        <TopBar
          title="// TODO: mTask"
          logged={false}
        />
        <LoginForm
          onLogin={this.handleLogin}
          emailError={this.state.emailError}
          passwordError={this.state.passwordError}
        />
        { this.state.showError ? <p style={{color: "red"}}> Wrong email or password! </p> : null }

        { this.state.logged ? <Redirect to="/"/> : null }
      </div>
    );
  }
}

export default Login;
