import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Link} from 'react-router-dom';

import { IconButton, IconMenu, MenuItem, FlatButton } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TodoIcon from 'material-ui/svg-icons/editor/format-list-bulleted';

const MainButton = (props) => (
  <IconButton>
    <Link to='/'><TodoIcon color='white'/></Link>
  </IconButton>
);
MainButton.muiName = "IconButton";

const LoggedMenu = (props) => (
  <IconMenu
    iconStyle={props.iconStyle}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Sign out" onTouchTap={props.onLogoutClick}/>
  </IconMenu>
);
LoggedMenu.muiName = "IconMenu";

class LoginButton extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login"/>
    );
  }
}

class TopBar extends Component {

  render() {
    return (
      <AppBar
        title={this.props.title}
        iconElementLeft={<MainButton/>}
        iconElementRight={
          this.props.logged ?
          <LoggedMenu onLogoutClick={this.props.onLogoutClick}/>
          :
          <LoginButton onClick={this.props.onLoginClick}/>
        }
      />
    );
  }
}

export default TopBar;
