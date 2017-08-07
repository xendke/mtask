import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class AlertDialog extends React.Component {
  state = {
    open: false
  }
  handleClose = () => {
    this.setState({
      open: false
    });
  }
  handleOpen = () => {
    this.setState({
      open: true
    });
  }
  render() {
    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        {this.props.text}
      </Dialog>
    );

  }
}

export default AlertDialog;
