import React, { Component } from 'react';

class Verse extends Component{
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return(
      <form>
        <label htmlfor="song">
          Song Title
          <input type="text" id="song" />
          <input type="submit" id="Submit" />
        </label>
      </form>
    )
  }
}

export default Verse;
