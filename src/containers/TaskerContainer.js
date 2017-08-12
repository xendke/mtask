import React, { Component } from 'react';
import * as firebase from 'firebase';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TaskList from '../components/TaskList';
import AlertDialog from '../components/AlertDialog';

class Tasker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _tasks: [],
      _alert_text: "Default"
    }
  }

  taskExists = (name) => {
    for (var i = 0; i < this.state._tasks.length; i++) {
      if (this.state._tasks[i].title === name ) {
        return true;
      }
    }
    return false;
  }

  handleAddTask = (ev) => {
    ev.preventDefault();
    var title = this.TextField.input.value;

    if(this.taskExists(title)) {
      this.setState({
        _alert_text: "Task '"+title+"' Already Exists"
      });
      this.AlertDialog.handleOpen();
      return;
    } else if (!title || !title.trim()) {
      this.setState({
        _alert_text: "Task name cannot be empty!"
      });
      this.AlertDialog.handleOpen();
      return;
    }

    var newTasksKey = this.tasksRef.push().key;
    this.tasksRef.child(newTasksKey).set({title: title});

    this.TextField.input.value = "";
  }

  handleEditTask = (name, new_name) => {
    if(!this.taskExists(name) || this.taskExists(new_name)){
      this.setState({
        _alert_text: "Edit was not successful!"
      });
      this.AlertDialog.handleOpen();
      return;
    }

    var _tasks_new = this.state._tasks.slice();
    for (var i = 0; i < _tasks_new.length; i++) {
      if( _tasks_new[i].title === name ) {
        _tasks_new[i].title = new_name;
        this.setState({ _tasks: _tasks_new });
        return;
      }
    }
  }

  handleRemoveTasks = (targets) => {
    if(!targets || targets === 0) return

    for(var i = 0; i < targets.length; i++) { // updates[] ?
      this.tasksRef.child(targets[i]).remove();
    }
  }

  unloadTask = (snapshot) => {
    this.setState((prevState, props) => { // race condition, we must use callback setState
      var _tasks_new = prevState._tasks.slice();
      for (var i = 0; i < _tasks_new.length; i++) {
        if(_tasks_new[i].id === snapshot.key) {
          _tasks_new.splice(i, 1);
          break;
        }
      }
      return {_tasks: _tasks_new};
    });
  }
  loadTask = (snapshot) => {
    var _tasks_new = this.state._tasks.slice();
    _tasks_new.push({id: snapshot.key, title: snapshot.val().title});

    this.setState({
      _tasks: _tasks_new
    });
  }
  componentDidMount() {
    this.tasksRef = firebase.database().ref("users/"+this.props.user.uid+"/tasks");

    this.tasksRef.on('child_added', (snapshot) => {
      this.loadTask(snapshot);
    });

    this.tasksRef.on('child_removed', (snapshot) => {
      this.unloadTask(snapshot);
    });
  }
  render() {
    return (
      <div>
      <form onSubmit={this.handleAddTask}>
        <TextField id="TextField" className="TextField" ref={instance => this.TextField = instance}/>
        <RaisedButton label="Add" onTouchTap={this.handleAddTask}/>
      </form>
        <AlertDialog text={this.state._alert_text} ref={instance => this.AlertDialog = instance}/>
        <br/>
        <br/>
        <TaskList
          onEditTask={this.handleEditTask}
          className="TaskList" tasks={this.state._tasks}
          onRemoveTasks={this.handleRemoveTasks}
          ref={instance => this.TaskList = instance}
          user={this.props.user}
        />
        <br/>
        <RaisedButton label="Done" secondary={true} onTouchTap={() => {this.TaskList.handleRemoveTasks();}} />
      </div>
    );
  }
}

export default Tasker;
