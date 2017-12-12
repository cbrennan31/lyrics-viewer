import React, { Component } from 'react';

class SongVerse extends Component{
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

export default SongVerse;
