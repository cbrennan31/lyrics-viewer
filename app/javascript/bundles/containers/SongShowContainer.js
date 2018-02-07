import React, { Component } from 'react';
import { connect } from 'react-redux';
import SongVerse from '../components/SongVerse'
import VerseForm from '../components/VerseForm'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux';
import ActionCable from 'actioncable'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import SongTitleForm from '../components/SongTitleForm'
import TextField from 'material-ui/TextField';
import RedGreenButtonDiv from '../components/RedGreenButtonDiv'
import EditDeleteButtons from '../components/EditDeleteButtons'

const mapStateToProps = (state) => ({
  cable: state.cable,
  currentVerse: state.verseSelection.currentVerse,
  verseIDs: state.verseSelection.verseIDs,
  showEditSongForm: state.showEditSongForm,
  showAddVerseForm: state.showAddVerseForm
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    subscribe: Actions.subscribe,
    handlePrevious: Actions.handlePrevious,
    handleNext: Actions.handleNext,
    editTitleRequest: Actions.editTitleRequest,
    toggleEditSongForm: Actions.toggleEditSongForm,
    toggleAddVerseForm: Actions.toggleAddVerseForm,
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
    let addVerse = this.props.showAddVerseForm ?
      <VerseForm
        onSubmit = {this.props.submitVerseRequest}
        songid={this.props.id}
        open={this.props.showAddVerseForm}
        cancel={this.props.toggleAddVerseForm}
      />
      :
      <FlatButton
        label="Add Verse"
        onClick={this.props.toggleAddVerseForm}
        secondary={true}
        backgroundColor='hsl(0, 0%, 92%)'
        labelStyle={{
          textTransform: 'none',
          fontSize: '16',
        }}
      />

    let input

    let editSong = this.props.showEditSongForm ?
      <div>
        <SongTitleForm
          id={this.props.id}
          toggleForm={this.props.toggleEditSongForm}
          placeholder={null}
          textValue={this.state.editTitleValue}
          onSubmit={this.props.editTitleRequest}
        />
      </div>
      :
      <div id='song-title-edit'>
        <span id='song-title'>{this.props.title}</span>
        <EditDeleteButtons
          onClickEdit={this.props.toggleEditSongForm}
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
          toggleAddVerseForm={this.props.toggleAddVerseForm}
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
