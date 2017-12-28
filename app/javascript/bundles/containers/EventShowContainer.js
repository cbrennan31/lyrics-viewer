import { connect } from 'react-redux'
import React, { Component } from 'react';
import SongShowContainer from './SongShowContainer'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux';
import ActionCable from 'actioncable';
import SongForm from '../components/SongForm'

const mapStateToProps = (state) => ({
  selectedSong: state.selectedSong,
  cable: state.cable,
  eventInProgress: state.eventInProgress,
  songFormRevealed: state.songFormRevealed
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setVerseIDs: Actions.setVerseIDs,
    selectSong: Actions.selectSong,
    subscribe: Actions.subscribe,
    startEvent: Actions.startEvent,
    endEvent: Actions.endEvent,
    addSong: Actions.addSong
  }, dispatch)
}

class EventShowContainer extends Component{
  componentDidMount() {
    this.props.subscribe(this.props.cable)
  }

  render() {
    let addSong = this.props.songFormRevealed ?
      <SongForm /> :
      <input type="button" value="Add Song" onClick={this.props.addSong}/>

    let eventMessage = this.props.eventInProgress > 0 ? <p>Event In Progress</p> : <p>Click "Start Event" to Begin</p>
    let songContainer
    let dispatch = this.props.dispatch
    this.props.songs.forEach((song) => {
      if (song.id == this.props.selectedSong) {
        songContainer = <SongShowContainer
          verses = {this.props.verses[song.id - 1]}
          subscribe = {this.props.subscribe}
          cable = {this.props.cable}
        />
      }
    })
    let songTitles = this.props.songs.map((song) => {
      return <p
        key={song.id}
        id={song.id}
        onClick = { () => {
          this.props.selectSong(song.id)
          this.props.setVerseIDs(this.props.verses[song.id - 1])
        }}
      >
        {song.title}
      </p>
    })

    return(
      <div>
        <p>{this.props.event.title}</p>
        {eventMessage}
        <input
          type="button"
          value="Start Event"
          onClick={() =>
            this.props.startEvent(this.props.event.id, (id) => {
              this.props.cable.subscription.send({current_event: id})
            })
          }
        />
        <input type="button" value="End Event" onClick={() => this.props.endEvent(() => {
              this.props.cable.subscription.send({current_event: 0})
            })
          }
        />
        {songTitles}
        {addSong}
        {songContainer}
      </div>

    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventShowContainer)
