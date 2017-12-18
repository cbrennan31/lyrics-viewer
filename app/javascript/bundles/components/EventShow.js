import React, { Component } from 'react';
import SongShowContainer from '../containers/SongShowContainer'
import { connect } from 'react-redux'
import selectSong from '../actions/index'
import ActionCable from 'actioncable'

class EventShow extends Component{
  constructor(props) {
    super(props);

    this.state = {
      selectedSong: this.props.selectedSong,
      cable: ActionCable.createConsumer('/cable'),
      subscription: false
    }
  }

  componentDidMount() {
    this.state.subscription = this.state.cable.subscriptions.create({
      channel: "VersesChannel"
    })
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
      return <p key={song.id} id={song.id} onClick = { () => dispatch(selectSong(song.id))}>{song.title}</p>
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
