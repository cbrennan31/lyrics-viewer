import React, { Component } from 'react';
import SongShowContainer from '../containers/SongShowContainer'
import ActionCable from 'actioncable'

class EventShow extends Component{
  constructor(props) {
    super(props);

    this.state = {
      selectedSong: 1,
      cable: ActionCable.createConsumer('/cable'),
      subscription: false,
      currentVerse: 0,
    }

    this.handleSongSelection = this.handleSongSelection.bind(this)
  }

  componentDidMount() {
    this.state.subscription = this.state.cable.subscriptions.create({
      channel: "VersesChannel"
    })
  }

  handleSongSelection(e) {
    this.setState({selectedSong: e.target.id})
  }

  render() {
    let songContainer
    this.props.songs.forEach((song) => {
      if (song.id == this.state.selectedSong) {
        songContainer = <SongShowContainer verses = {this.props.verses[song.id - 1]} />
      }
    })
    let songTitles = this.props.songs.map((song) => {
      return <p key={song.id} id={song.id} onClick={this.handleSongSelection}>{song.title}</p>
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
