import { connect } from 'react-redux'
import React, { Component } from 'react';
import SongShowContainer from './SongShowContainer'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux';
import ActionCable from 'actioncable';
import AddSongForm from '../components/AddSongForm'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RedGreenButtonDiv from "../components/RedGreenButtonDiv"
import FlatButton from 'material-ui/FlatButton';


const mapStateToProps = (state) => {
  let songs = state.receiveSongs.songs ? state.receiveSongs.songs : []
  let verses = state.receiveSongs.verses ? state.receiveSongs.verses : []
  return ({
    selectedSong: state.selectedSong,
    cable: state.cable,
    eventInProgress: state.eventInProgress,
    showAddSongForm: state.showAddSongForm,
    songs: songs,
    verses: verses
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectSong: Actions.selectSong,
    subscribe: Actions.subscribe,
    startEvent: Actions.startEvent,
    endEvent: Actions.endEvent,
    toggleAddSongForm: Actions.toggleAddSongForm,
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
    let addSong = this.props.showAddSongForm ?
      <AddSongForm
        onSubmit = {this.props.submitSongRequest}
        eventid={this.props.event.id}
        toggleAddSongForm={this.props.toggleAddSongForm}
        showAddSongForm={this.props.showAddSongForm}
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

          <RedGreenButtonDiv
            labelRed="Start Event"
            labelGreen="End Event"
            onClickRed={() =>
              this.props.startEvent(this.props.event.id, (id) => {
                this.props.cable.subscription.send({current_event: id})
              })
            }
            onClickGreen={() => this.props.endEvent(() => {
                this.props.cable.subscription.send({current_event: 0})
              })
            }
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
