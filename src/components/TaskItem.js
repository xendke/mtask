import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

import IconButton from 'material-ui/IconButton';
import {grey400} from 'material-ui/styles/colors';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-horiz';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import EditDialog from './EditDialog';


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="top-right"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.task.title
    };
  }
  handleEditMenu = () => {
    this.AlertDialog.handleOpen();
  }
  handleEditTask = (new_name) => {
    this.taskRef.child('title').set(new_name);
    this.props.onEditTask(this.props.task.title , new_name);
  }
  handleCheck = (ev, checked) => {
    this.props.onCheck(this.props.task.id, checked);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.task.title !== this.state.label) {
      this.setState({
        label: nextProps.task.title
      });
    }
  }
  componentDidMount() { // each TaskItem will have it's own listener
    this.taskRef = firebase.database().ref("users/"+this.props.uid+"/tasks/"+this.props.task.id);

    this.taskRefListener = this.taskRef.on('value', (snapshot) => {
      if (snapshot.val() === null) return;
      this.setState({
        label: snapshot.val().title
      });
    });
  }
  componentWillUnmount() {
    this.taskRef.off('value', this.taskRefListener);
  }
  render() {
    const { task } = this.props;
    ;
    return (
    <div>
      <EditDialog ref={instance => this.AlertDialog = instance} onEditTask={this.handleEditTask} title={task.title}/>
      <ListItem
        leftCheckbox={<Checkbox onCheck={this.handleCheck}/>}
        rightIconButton={
          <IconMenu iconButtonElement={iconButtonElement}>
            <MenuItem onTouchTap={this.handleEditMenu} >Edit</MenuItem>
            <MenuItem onTouchTap={() => this.props.onMenuRemove(this.props.task.id)}>Delete</MenuItem>
          </IconMenu>
        }
        primaryText={this.state.label}
      />
    </div>
    );
  }
}

export default TaskItem;
