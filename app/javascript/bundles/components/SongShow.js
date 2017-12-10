import React, { Component } from 'react';

class SongShow extends Component{
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return(
      <form onSubmit = {this.props.handleSubmit}>
        <input type="text" value = {this.props.verseId} onChange = {this.props.handleChange}/>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}

export default SongShow;
