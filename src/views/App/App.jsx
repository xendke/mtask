import React, { Component } from 'react';
import * as firebase from "firebase";

import './App.css';

import {TaskerContainer} from 'containers';
import TopBar from 'components/TopBar.jsx';


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
      <div className="App">
        <TopBar
          title="// TODO: mTask"
          logged={this.state.logged}
          onLogoutClick={this.handleLogoutClick}
          onLoginClick={this.handleLoginClick}
        />
        <br/>
        {this.state.logged ? <TaskerContainer user={this.state.user}/> : <p> not logged in</p>}
      </div>
    );
  }
}

export default App;
