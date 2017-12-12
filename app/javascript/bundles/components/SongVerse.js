import React, { Component } from 'react';

class SongVerse extends Component{
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    let fontColor = 'black'
    if (this.props.selected) {
      fontColor = 'red'
    }
    return(
      <div style = {{color: fontColor}}>{this.props.lyrics}</div>
    )
  }
}

export default SongVerse;
