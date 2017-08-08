import React, { Component } from 'react';
import * as firebase from "firebase";
import ReCaptcha from 'react-recaptcha';

import TopBar from 'components/TopBar';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class Register extends Component {
  state = {
    logged: false,
    verified: false,
    email: "",
    pw1: "",
    pw2: ""
  }
  componentDidMount() { // redirect to app if logged
    console.log("helo");
    this.unsubscribeAuth = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.setState({logged: true});
      } else {
        this.user = null
        this.setState({
          logged: false
        });
      }
    });
  }
  componentWillUnmount() { // stop listening when the component is not mounted
    this.unsubscribeAuth();
  }
  handleRegister = () => {
    console.log("ver: "+this.state.verified);
    if(!this.state.verified) return;
    if(this.state.pw1 !== this.state.pw2) return;
    const email = this.state.email;
    const password = this.state.pw1;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error.message);
    });
  }
  handleVerified = () => {
    console.log("ay");
    this.setState({
      verified: true
    });
  }
  handleInputChange = (e) => {
    const new_value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: new_value
    });
  }
  render() {
    return (
      <div className="App">
        <TopBar
          title="// TODO: mTask"
          logged={this.state.logged}
          onLoginClick={() => {this.props.history.push("/login")}}
          onLogoutClick={() => {
            firebase.auth().signOut()
            .then(() => {
              this.setState({logged: false});
            })}
          }
        />
        <form>
        <Paper zDepth={1} style={{width: 500, margin: "auto", marginTop: 100, paddingBottom: 20}}>
          <TextField
            name="email"
            hintText=""
            floatingLabelText="Email"
            errorText={this.state.emailError}
            onChange={this.handleInputChange}
          /> <br/>
          <TextField
            name="pw1"
            type="password"
            hintText=""
            floatingLabelText="Password"
            errorText={this.state.passwordError1}
            onChange={this.handleInputChange}
          /><br/>
          <TextField
            name="pw2"
            type="password"
            hintText=""
            floatingLabelText="Confirm Password"
            errorText={this.state.passwordError2}
            onChange={this.handleInputChange}
          /><br/><br/>
          <div style={{margin: "auto", width: "50%"}}>
          <ReCaptcha
            style={{marginLeft: "auto", marginRight: "auto", textAlign: "center",paddingTop: 20, paddingBottom: 20 }}
            sitekey="6LftrisUAAAAABRYeqK0noJzI2Jm_YgR6Fe7uEOL"
            verifyCallback={this.handleVerified}
          /><br/>
          </div>
          <RaisedButton label="Register" primary={true} onClick={this.handleRegister}/> <br/>
        </Paper>
        </form>
      </div>
    );
  }
}

export default Register;
