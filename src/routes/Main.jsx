import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import { App, Login, Register } from 'views';

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={App}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </Switch>
    );
  }
}

export default Main;
