import React, { Component } from 'react';
import { connect } from 'react-redux';
import SongVerse from '../components/SongVerse'
import VerseForm from '../components/VerseForm'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux';
import ActionCable from 'actioncable'
import { GridList } from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'

const mapStateToProps = (state) => ({
  cable: state.cable,
  currentVerse: state.verseSelection.currentVerse,
  verseIDs: state.verseSelection.verseIDs,
  songTitleEdit: state.songTitleEdit,
  verseFormRevealed: state.verseFormRevealed
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setVerseIDs: Actions.setVerseIDs,
    subscribe: Actions.subscribe,
    handlePrevious: Actions.handlePrevious,
    handleNext: Actions.handleNext,
    editTitleRequest: Actions.editTitleRequest,
    editSong: Actions.editSong,
    addVerse: Actions.addVerse,
    submitVerseRequest: Actions.submitVerseRequest,
    deleteSongRequest: Actions.deleteSongRequest
  }, dispatch)
}

class SongShowContainer extends Component{

  componentDidMount() {
    this.props.subscribe(this.props.cable)
    this.props.setVerseIDs(this.props.verses)
  }

  render() {
    let addVerse = this.props.verseFormRevealed ?
      <VerseForm onSubmit = {this.props.submitVerseRequest} songid={this.props.id} /> :
      <input
        type="button"
        value="Add Verse"
        onClick={this.props.addVerse}
      />


    let input

    let editSong = this.props.songTitleEdit ?
      <div>
        <form onSubmit={(e) => {
            e.preventDefault();
            this.props.editTitleRequest(
              {id: this.props.id, title: input.value},
              this.props.songTitleEdit
            )
          }
        }>
          <input type="text" defaultValue={this.props.title} ref={(node) => {input = node }} />
          <input type="submit" value="Submit New Title" />
          <input type="button" value="Cancel" onClick={() => this.props.editSong(this.props.songTitleEdit)}/>
        </form>
      </div>
      :
      <div id='song-title-edit'>
        <span id='song-title'>{this.props.title}</span>
        <FlatButton
          label="Edit"
          onClick={() => this.props.editSong(this.props.songTitleEdit)}
          secondary={true}
          backgroundColor='#f2f2f2'
          fullWidth={false}
          labelStyle={{
            textTransform: 'none',
            fontSize: '14px',
            verticalAlign: 'none',
            marginTop: '-17.5px',
            marginLeft: '-28.5px',
            position: 'absolute',
          }}
          style={{
            verticalAlign: 'middle',
            margin: '10px',
            width: '40px',
            minWidth: '0px',
            height: '20px',
          }}
        />
      </div>

    let verses

    if (this.props.verses) {
      verses = this.props.verses.map((verse) => {
        return <SongVerse
          key={verse.id}
          id={verse.id}
          lyrics={verse.lyrics}
          selected = {this.props.currentVerse == verse.id}
        />
      })
    }

    return(
      <div id='verses-grid-container'>
        <div id='song-header'>
          <div>
            {editSong}
            <RaisedButton
              secondary={true}
              label="Delete"
              onClick={() => this.props.deleteSongRequest(this.props.id)}
              labelStyle={{
                textTransform: 'none',
                fontSize: '14px',
                verticalAlign: 'none',
                marginTop: '-17.5px',
                marginLeft: '-6px',
              }}
              style={{
                verticalAlign: 'middle',
                margin: '0px 5px 0px 0px',
                width: '60px',
                minWidth: '0px',
                height: '20px',
                textAlign: 'center',
                boxShadow: '0px'
              }}
            />
          </div>

          <input
            type="button"
            value="Previous"
            onClick={() => {
              this.props.handlePrevious(this.props.verseIDs, this.props.currentVerse, (newVerse) => {
                this.props.cable.subscription.send({
                  id: newVerse
                })
              })
            }}
          />

          <input
            type="button"
            value="Next"
            onClick={() => {
              this.props.handleNext(this.props.verseIDs, this.props.currentVerse, (newVerse) => {
                this.props.cable.subscription.send({
                  id: newVerse
                })
              })
            }}
          />

          <br/>

          {addVerse}
        </div>

        <div id='verses-grid'>
          {verses}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongShowContainer)
