import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './LoginForm.css';

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    emailError: "",
    passwordError: ""
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var handled = false;
    if (this.state.email === "") {
      this.setState({emailError: "Email cannot be empty"});
      handled = true;
    } else {
      this.setState({emailError: ""});
    }

    if (this.state.password === "") {
      this.setState({passwordError: "Password cannot be empty"});
      handled = true;
    } else {
      this.setState({passwordError: ""});
    }
    if (!handled) {
      this.props.onLogin(this.state.email, this.state.password);
    }
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.emailError !== this.state.emailError) {
      this.setState({emailError: nextProps.emailError});
    }
  }

  render() {
    return (
      <div className="LoginForm">
        <form id="lForm" onSubmit={this.handleSubmit}>
          <TextField
            floatingLabelText="Email"
            onChange={this.handleEmailChange}
            value={this.state.email}
            errorText={this.state.emailError}
          /> <br />
          <TextField
            type="password"
            floatingLabelText="Password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
            errorText={this.state.passwordError}
          /> <br />
          <RaisedButton type="submit" label="Log In" primary={true}/>
        </form>
      </div>
    );
  }
}

export default LoginForm;
