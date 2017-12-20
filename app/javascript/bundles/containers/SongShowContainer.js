import React, { Component } from 'react';
import { connect } from 'react-redux';
import SongVerse from '../components/SongVerse'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux';
import ActionCable from 'actioncable'

const mapStateToProps = (state) => ({
  cable: state.cable,
  currentVerse: state.verseSelection.currentVerse,
  verseIDs: state.verseSelection.verseIDs
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setVerseIDs: Actions.setVerseIDs,
    subscribe: Actions.subscribe,
    handlePrevious: Actions.handlePrevious,
    handleNext: Actions.handleNext
  }, dispatch)
}

class SongShowContainer extends Component{

  componentDidMount() {
    this.props.subscribe(this.props.cable)
  }

  render() {
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
