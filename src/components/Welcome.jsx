import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Card, CardMedia, CardTitle, CardActions } from 'material-ui/Card';
import { FlatButton, RaisedButton } from 'material-ui';

class Welcome extends Component {

  render() {
    return (
      <Card style={{textAlign: "left", margin: "auto", maxWidth: 700}}>
        <CardMedia
          overlay={<CardTitle title="mTask" subtitle="A todo app built using React.js, Firebase, and MaterialUI"/>}
        >
        <img src="banner.jpg" alt="todo"/>
        </CardMedia>
        <CardActions> 
          <Link to={`/login`}>
            <FlatButton label="Login" primary={true}/>
          </Link>
          <Link to={`/register`}>
            <RaisedButton label="Register" primary={true}/>
          </Link>
        </CardActions>
      </Card>
    );
  }

}

export default Welcome;
