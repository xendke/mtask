import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'; // here and injectTapEventPlugin(); below fix onTouchTap warnings

import { BrowserRouter } from 'react-router-dom';

import { Main } from 'routes';
import './index.css';

/* MaterialUI */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from 'config/MuiTheme';

injectTapEventPlugin();

/* Firebase */
import * as firebase from "firebase";
import config from 'firebase/config.js'
firebase.initializeApp(config);

ReactDOM.render(
  (<MuiThemeProvider muiTheme={muiTheme}>
    <BrowserRouter basename={'/mtask'}>
      <Main/>
    </BrowserRouter>
  </MuiThemeProvider>),
  document.getElementById('root')
);
