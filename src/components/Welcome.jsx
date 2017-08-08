import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Welcome extends Component {

  render() {
    return (
      <div>
        <Link to={`/register`}> Register</Link>
      </div>
    );
  }

}

export default Welcome;
