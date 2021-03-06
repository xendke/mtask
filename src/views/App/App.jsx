import React, { Component } from 'react';
import * as firebase from "firebase";

import './App.css';

import {TaskerContainer} from 'containers';
import TopBar from 'components/TopBar.jsx';
import Welcome from 'components/Welcome.jsx'


class App extends Component {
  state = {
    user: null,
    logged: false
  }

  handleLogoutClick = () => {
    firebase.auth().signOut()
    .then(() => {
      this.setState({logged: false, user: null});
    })
    .catch(function(error) {
      // An error happened.
    });
  }

  handleLoginClick = (e) => {
    this.props.history.push("/login");
  }

  componentDidMount() {
    this.unsubscribeAuth = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user: user, logged: true});
      } else {
        // console.log("not logged in");
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeAuth();
  }
  render() {
    return (
      <div>
        <TopBar
          title="mTask"
          logged={this.state.logged}
          onLogoutClick={this.handleLogoutClick}
          onLoginClick={this.handleLoginClick}
        />
      <div className="App">
        <br/>
        {this.state.logged ? <TaskerContainer user={this.state.user}/> : <Welcome/>}
      </div>
      </div>
    );
  }
}

export default App;
