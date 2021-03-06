import { connect } from 'react-redux'
import React, { Component } from 'react';
import SongShowContainer from './SongShowContainer'
import * as Actions from '../actions/EventShow'
import { bindActionCreators } from 'redux';
import ActionCable from 'actioncable';
import SongTitleForm from '../components/SongTitleForm'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ControlsButton from "../components/ControlsButton"
import FlatButton from 'material-ui/FlatButton';

const mapStateToProps = (state, ownProps) => {
  let songs = state.receiveSongs.songs || []
  let verses = state.receiveSongs.verses || []
  let eventInProgress = state.eventInProgress != null ? state.eventInProgress : ownProps.event.in_progress
  let selectedSong = state.selectedSong || ownProps.event.selected_song_id
  return ({
    selectedSong,
    cable: state.cable,
    showAddSongForm: state.showAddSongForm,
    eventInProgress,
    songs,
    verses,
    addSongTitleValue: state.addSongTitleValue
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateSelectedSong: Actions.updateSelectedSong,
    subscribe: Actions.subscribe,
    updateEventStatus: Actions.updateEventStatus,
    toggleAddSongForm: Actions.toggleAddSongForm,
    submitSongRequest: Actions.submitSongRequest,
    requestSongsOnMount: Actions.requestSongsOnMount,
    handleAddTitleChange: Actions.handleAddTitleChange
  }, dispatch)
}

class EventShowContainer extends Component{

  componentDidMount() {
    this.props.subscribe(this.props.cable)
    this.props.requestSongsOnMount(this.props.event.id)
  }

  render() {
    let addSong = this.props.showAddSongForm ?
      <SongTitleForm
        onSubmit={this.props.submitSongRequest}
        onChange={this.props.handleAddTitleChange}
        id={this.props.event.id}
        toggleForm={this.props.toggleAddSongForm}
        placeholder={'Enter title'}
        defaultValue=''
        value={this.props.addSongTitleValue}
      /> :
      <FlatButton
        label="Add Song"
        onClick={() => this.props.toggleAddSongForm()}
        secondary={true}
        backgroundColor='hsl(0, 0%, 92%)'
        labelStyle={{
          textTransform: 'none',
          fontSize: '16',
        }}
      />

    let eventMessage = this.props.eventInProgress ? <p>Event In Progress</p> : <p>Click "Start Event" to Begin</p>
    let songContainer

    this.props.songs.forEach((song) => {
      if (song.id == this.props.selectedSong) {
        songContainer = <SongShowContainer
          eventID = {this.props.id}
          id = {song.id}
          title = {song.title}
          selectedVerseId = {song.selected_verse_id}
          verses = { this.props.verses[song.id] }
          subscribe = {this.props.subscribe}
          cable = {this.props.cable}
          eventInProgress = {this.props.eventInProgress}
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
          this.props.updateSelectedSong({
            id: this.props.event.id,
            selected_song_id: song.id
          })
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
          <div className="back-to-events-container">
            <a href="/events" className="back-to-events">&#8592; All Events</a>
          </div>

          <p id='event-title'>{this.props.event.title}</p>

          {eventMessage}

          <div className="green-red-button-div">
            <ControlsButton
              backgroundColor="#a4c639"
              label="Start Event"
              onClick={() =>
                this.props.updateEventStatus({
                  id: this.props.event.id,
                  in_progress: true
                }, (id) => {
                  this.props.cable.subscription.send({current_event: id})
                })
              }
            />

            <ControlsButton
              label="End Event"
              backgroundColor="#ff0079"
              onClick={() =>
                this.props.updateEventStatus({
                  id: this.props.event.id,
                  in_progress: false
                }, (id) => {
                  this.props.cable.subscription.send({current_event: null})
                })
              }
            />
          </div>

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
