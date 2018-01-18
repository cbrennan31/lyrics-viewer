import { connect } from 'react-redux'
import React, { Component } from 'react';
import SongShowContainer from './SongShowContainer'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux';
import ActionCable from 'actioncable';
import SongForm from '../components/SongForm'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import StartEndEventDiv from "../components/StartEndEventDiv"
import FlatButton from 'material-ui/FlatButton';


const mapStateToProps = (state) => {
  let songs = state.receiveSongs.songs ? state.receiveSongs.songs : []
  let verses = state.receiveSongs.verses ? state.receiveSongs.verses : []
  return ({
    selectedSong: state.selectedSong,
    cable: state.cable,
    eventInProgress: state.eventInProgress,
    songFormRevealed: state.songFormRevealed,
    songs: songs,
    verses: verses
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setVerseIDs: Actions.setVerseIDs,
    selectSong: Actions.selectSong,
    subscribe: Actions.subscribe,
    startEvent: Actions.startEvent,
    endEvent: Actions.endEvent,
    revealSongForm: Actions.revealSongForm,
    submitSongRequest: Actions.submitSongRequest,
    requestSongsOnMount: Actions.requestSongsOnMount,
  }, dispatch)
}

class EventShowContainer extends Component{
  componentDidMount() {
    this.props.subscribe(this.props.cable)
    this.props.requestSongsOnMount(this.props.event.id)
  }

  render() {
    let addSong = this.props.songFormRevealed ?
      <SongForm
        onSubmit = {this.props.submitSongRequest}
        eventid={this.props.event.id}
        revealSongForm={this.props.revealSongForm}
        songFormRevealed={this.props.songFormRevealed}
      /> :
      <FlatButton
        label="Add Song"
        onClick={() => this.props.revealSongForm(this.props.songFormRevealed)}
        secondary={true}
        backgroundColor='#f2f2f2'
        labelStyle={{
          textTransform: 'none',
          fontSize: '16'
        }}
      />

    let eventMessage = this.props.eventInProgress > 0 ? <p>Event In Progress</p> : <p>Click "Start Event" to Begin</p>
    let songContainer

    this.props.songs.forEach((song) => {
      if (song.id == this.props.selectedSong) {
        songContainer = <SongShowContainer
          eventID = {this.props.id}
          id = {song.id}
          title = {song.title}
          verses = { this.props.verses[song.id] }
          subscribe = {this.props.subscribe}
          cable = {this.props.cable}
        />
      }
    })
    let songTitles = this.props.songs.map((song) => {
      let className = "event-menu-song-title"

      if (song.id == this.props.selectedSong) {
        className = className + " selected"
      }

      return <MenuItem
        key={song.id}
        id={song.id}
        onClick = { () => {
          this.props.selectSong(song.id)
          if (this.props.verses) {
            this.props.setVerseIDs(this.props.verses[this.props.songs.indexOf(song)])
          }
        }}
        className={className}
      >
        {song.title}
      </MenuItem>
    })

    return(
      <div>
        <Drawer
          open={true}
          containerClassName='event-side-menu'
          className='event-side-menu'
          width={300}
        >
          <p id='event-title'>{this.props.event.title}</p>

          {eventMessage}

          <StartEndEventDiv
            startEvent={this.props.startEvent}
            endEvent={this.props.endEvent}
            event={this.props.event}
            subscription={this.props.cable.subscription}
          />

          {songTitles}

          <div id='add-song-div'>
            {addSong}
          </div>
        </Drawer>

        {songContainer}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventShowContainer)
