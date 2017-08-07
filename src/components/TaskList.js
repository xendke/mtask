import React, { Component } from 'react';

import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';

import TaskItem from './TaskItem';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _checked_tasks: []
    }
  }
  handleCheck = (id, checked) => {
    var { _checked_tasks } = this.state;

    if(checked) {
      var _checked_new = _checked_tasks.slice();
      _checked_new.push(id);
      this.setState({
        _checked_tasks: _checked_new
      });
    } else {
      _checked_new = _checked_tasks.slice();
      var index = _checked_new.indexOf(id);
      _checked_new.splice(index, 1);
      this.setState({
        _checked_tasks: _checked_new
      });
    }
  }

  handleRemoveTasks = (ev) => {
    this.props.onRemoveTasks(this.state._checked_tasks);

    this.setState({
      _checked_tasks: []
    });
  }
  handleRemoveSingle = (target) => {
    this.props.onRemoveTasks([target]);

    var _checked_new = this.state._checked_tasks.slice();
    var index = _checked_new.indexOf(target);
    _checked_new.splice(index, 1);
    this.setState({
      _checked_tasks: _checked_new
    });
  }
  handleEditTask = (name, new_name) => {
    this.props.onEditTask(name, new_name);
    // console.log("handleEdit -- TaskList",name, new_name)
    // console.log();
  }

  render() {
    const { tasks } = this.props;
    return (
      <div>
      <Paper className="TaskListContainer">
        <List className="TaskList">
          <Subheader style={{textAlign: 'center'}}>Tasks</Subheader>
          { tasks.map( (item) =>
            <TaskItem
              uid={this.props.user.uid}
              className="TaskItem"
              key={item.id}
              task={item}
              onCheck={this.handleCheck}
              onMenuRemove={this.handleRemoveSingle}
              onEditTask={this.handleEditTask}
            />)
          }
        </List>
      </Paper>
      </div>
    );
  }
}

TaskList.defaultProps = {
  tasks: [{id: 79430, title: "One"},{id: 84524, title: "Two"},{id: 80786814, title: "Three"}]
};

export default TaskList;
