import React, { Component } from 'react';

class Verses extends Component{
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return(
      <p>{this.props.lyrics}</p>
    )
  }
}

export default Verses;
