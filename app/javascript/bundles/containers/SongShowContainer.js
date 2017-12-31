import React, { Component } from 'react';
import { connect } from 'react-redux';
import SongVerse from '../components/SongVerse'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux';
import ActionCable from 'actioncable'

const mapStateToProps = (state) => ({
  cable: state.cable,
  currentVerse: state.verseSelection.currentVerse,
  verseIDs: state.verseSelection.verseIDs,
  songTitleEdit: state.songTitleEdit
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setVerseIDs: Actions.setVerseIDs,
    subscribe: Actions.subscribe,
    handlePrevious: Actions.handlePrevious,
    handleNext: Actions.handleNext,
    editSong: Actions.editSong
  }, dispatch)
}

class SongShowContainer extends Component{

  componentDidMount() {
    this.props.subscribe(this.props.cable)
    this.props.setVerseIDs(this.props.verses)
  }

  render() {
    let editSong = this.props.songTitleEdit ?
      <div>
        <input type="text" defaultValue={this.props.title}/>
        <input type="submit" value="Submit New Title" />
        <input type="button" value="Cancel" onClick={() => this.props.editSong(this.props.songTitleEdit)}/>
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
      <div>
        {editSong}
        {verses}
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
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongShowContainer)
