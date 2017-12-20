import React, { Component } from 'react';

class Verse extends Component{
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return(
      <div>{this.props.lyrics}</div>
    )
  }
}

export default Verse;
