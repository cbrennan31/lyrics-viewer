import { connect } from 'react-redux'
import React, { Component } from 'react';
import SongShowContainer from './SongShowContainer'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux';
import ActionCable from 'actioncable'

const mapStateToProps = (state) => ({
  selectedSong: state.selectedSong,
  cable: state.cable
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectSong: Actions.selectSong,
    subscribe: Actions.subscribe
  }, dispatch)
}

class EventShowContainer extends Component{
  componentDidMount() {
    this.props.subscribe(this.props.cable)
  }

  render() {
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
      return <p key={song.id} id={song.id} onClick = { () => this.props.selectSong(song.id)}>{song.title}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(EventShowContainer)
