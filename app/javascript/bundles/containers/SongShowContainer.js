import React, { Component } from 'react';
import { connect } from 'react-redux';
import SongVerse from '../components/SongVerse'
import VerseForm from '../components/VerseForm'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux';
import ActionCable from 'actioncable'
import { GridList } from 'material-ui/GridList';


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
      <div>
        <span>{this.props.title}</span>
        <input type="button" value="Edit Title" onClick={() => this.props.editSong(this.props.songTitleEdit)}/>
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
          {editSong}

          <input
            type='button'
            value='Delete Song'
            onClick={() => this.props.deleteSongRequest(this.props.id)}
          />
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
