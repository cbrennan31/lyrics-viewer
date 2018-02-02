import React, { Component } from 'react';
import { connect } from 'react-redux';
import SongVerse from '../components/SongVerse'
import VerseForm from '../components/VerseForm'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux';
import ActionCable from 'actioncable'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';
import RedGreenButtonDiv from '../components/RedGreenButtonDiv'
import EditDeleteButtons from '../components/EditDeleteButtons'

const mapStateToProps = (state) => ({
  cable: state.cable,
  currentVerse: state.verseSelection.currentVerse,
  verseIDs: state.verseSelection.verseIDs,
  songTitleEdit: state.songTitleEdit,
  verseFormRevealed: state.verseFormRevealed
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    subscribe: Actions.subscribe,
    handlePrevious: Actions.handlePrevious,
    handleNext: Actions.handleNext,
    editTitleRequest: Actions.editTitleRequest,
    editSong: Actions.editSong,
    toggleVerseForm: Actions.toggleVerseForm,
    submitVerseRequest: Actions.submitVerseRequest,
    deleteSongRequest: Actions.deleteSongRequest
  }, dispatch)
}

class SongShowContainer extends Component{

  constructor (props) {
    super (props)

    this.state = {
      editTitleValue: ''
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  componentDidMount() {
    this.props.subscribe(this.props.cable)
  }

  componentWillReceiveProps() {
    this.setState({editTitleValue: this.props.title})
  }

  handleTitleChange(e) {
    this.setState({editTitleValue: e.target.value})
  }

  render() {
    let addVerse = this.props.verseFormRevealed ?
      <VerseForm
        onSubmit = {this.props.submitVerseRequest}
        songid={this.props.id}
        open={this.props.verseFormRevealed}
        cancel={this.props.toggleVerseForm}
      />
      :
      <FlatButton
        label="Add Verse"
        onClick={this.props.toggleVerseForm}
        secondary={true}
        backgroundColor='hsl(0, 0%, 92%)'
        labelStyle={{
          textTransform: 'none',
          fontSize: '16',
        }}
      />

    let input

    let editSong = this.props.songTitleEdit ?
      <div>
        <form onSubmit={(e) => {
            e.preventDefault();
            this.props.editTitleRequest(
              {id: this.props.id, title: this.state.editTitleValue},
              this.props.songTitleEdit
            )
          }
        }>
          <TextField
            id="editSongTitle"
            value={this.state.editTitleValue}
            onChange={this.handleTitleChange}
            style={{
              fontSize: '20px'
            }}
          />

          <div id="edit-song-title-container">
            <RaisedButton
              default={true}
              type="submit"
              id="submitEditSong"
              label='Submit'
              labelStyle={{
                textTransform: 'none'
              }}
              className="song-form-button"
            />
            <RaisedButton
              secondary={true}
              id="cancelEditSong"
              label='Cancel'
              onClick={() => this.props.editSong(this.props.songTitleEdit)}
              labelStyle={{
                textTransform: 'none'
              }}
              className="song-form-button"
            />

          </div>
        </form>
      </div>
      :
      <div id='song-title-edit'>
        <span id='song-title'>{this.props.title}</span>
        <EditDeleteButtons
          onClickEdit={() => this.props.editSong(this.props.songTitleEdit)}
          onClickDelete={() => this.props.deleteSongRequest(this.props.id)}
        />
      </div>

    let verses

    if (this.props.verses) {
      verses = this.props.verses.map((verse) => {
        return <SongVerse
          key={verse.id}
          id={verse.id}
          lyrics={verse.lyrics}
          selected={this.props.currentVerse == verse.id}
          toggleVerseForm={this.props.toggleVerseForm}
        />
      })
    }

    return(
      <div id='verses-grid-container'>
        <div id='song-header'>
          <div>
            {editSong}
          </div>

          <RedGreenButtonDiv
            labelRed="Previous"
            labelGreen="Next"
            onClickRed={() => {
              this.props.handlePrevious(this.props.verses, this.props.currentVerse, (newVerse) => {
                this.props.cable.subscription.send({
                  id: newVerse
                })
              })
            }}
            onClickGreen={() => {
              this.props.handleNext(this.props.verses, this.props.currentVerse, (newVerse) => {
                this.props.cable.subscription.send({
                  id: newVerse
                })
              })
            }}
          />
        </div>

        <div id='verses-grid'>
          {verses}
        </div>

        <div id='add-verse-container'>
          {addVerse}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongShowContainer)
