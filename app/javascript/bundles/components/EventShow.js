import React, { Component } from 'react';
import SongShowContainer from '../containers/SongShowContainer'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import ActionCable from 'actioncable'

class EventShow extends Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(Actions.subscribe(this.props.cable))
  }

  render() {
    let songContainer
    let dispatch = this.props.dispatch
    this.props.songs.forEach((song) => {
      if (song.id == this.props.selectedSong) {
        songContainer = <SongShowContainer verses = {this.props.verses[song.id - 1]} />
      }
    })
    let songTitles = this.props.songs.map((song) => {
      return <p key={song.id} id={song.id} onClick = { () => dispatch(Actions.selectSong(song.id))}>{song.title}</p>
    })

    return(
      <div>
        <p>{this.props.event.title}</p>
        <input type="button" value="Start Event" />
        <input type="button" value="End Event" />
        {songTitles}
        {songContainer}
      </div>

    )
  }
}

export default EventShow;
