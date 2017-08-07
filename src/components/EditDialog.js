import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';



class EditDialog extends React.Component {
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
  handleSubmit = () => {
    var new_name = this.TextField.input.value;
    this.props.onEditTask(new_name);
    this.setState({
      open: false
    });
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Okay"
        primary={true}
        onTouchTap={this.handleSubmit}
      />
    ];
    return (
      <Dialog
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <TextField fullWidth={true} ref={instance => this.TextField = instance} defaultValue={this.props.title} floatingLabelText="New Name"/>
      </Dialog>
    );

  }
}

export default EditDialog;
