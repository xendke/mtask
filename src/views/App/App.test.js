import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin'; // here and injectTapEventPlugin(); below fix onTouchTap warnings

import App from './App';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './MuiTheme';

import * as Firebase from "firebase";
var config = {
    apiKey: "AIzaSyDuy86tcc2sqKDKHzGMxUQVsLOc1KPrlsg",
    authDomain: "mtask-be7ea.firebaseapp.com",
    databaseURL: "https://mtask-be7ea.firebaseio.com",
    projectId: "mtask-be7ea",
    storageBucket: "mtask-be7ea.appspot.com",
    messagingSenderId: "607368524481"
};
Firebase.initializeApp(config);


injectTapEventPlugin();
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((<MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>), div);
});
