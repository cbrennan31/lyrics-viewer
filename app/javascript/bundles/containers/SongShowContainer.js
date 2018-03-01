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
import ControlsButton from '../components/ControlsButton'
import EditDeleteButtons from '../components/EditDeleteButtons'
import DeleteConfirmation from '../components/DeleteConfirmation'

const mapStateToProps = (state) => ({
  cable: state.cable,
  showEditSongForm: state.showEditSongForm,
  showAddVerseForm: state.showAddVerseForm,
  showEditVerseForm: state.showEditVerseForm,
  showDeleteVerseForm: state.showDeleteVerseForm,
  showDeleteSongForm: state.showDeleteSongForm,
  songTitleValue: state.songTitleValue,
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
    deleteSongRequest: Actions.deleteSongRequest,
    editVerseRequest: Actions.editVerseRequest,
    toggleEditVerseForm: Actions.toggleEditVerseForm,
    deleteVerseRequest: Actions.deleteVerseRequest,
    toggleDeleteVerseForm: Actions.toggleDeleteVerseForm,
    toggleDeleteSongForm: Actions.toggleDeleteSongForm,
    handleSongTitleChange: Actions.handleSongTitleChange
  }, dispatch)
}

class SongShowContainer extends Component{

  componentDidMount() {
    this.props.subscribe(this.props.cable)
  }

  render() {
    let rightButtonLabel
    let rightButtonBackground = "#ff0079"
    let leftButton = <ControlsButton
      label="Previous Verse"
      backgroundColor="#a4c639"
      onClick={() => {
        this.props.handlePrevious(this.props.verses, this.props.id, this.props.selectedVerseId,
          (newVerseId) => {
            this.props.cable.subscription.send({
              selected_verse_id: newVerseId
            })
          }
        )
      }}
    />

    if (this.props.selectedVerseId === 0) {
      rightButtonLabel = "Start Song"
      leftButton = null
      rightButtonBackground = "#a4c639"
    } else if (this.props.selectedVerseId == this.props.verses[this.props.verses.length - 1].id) {
      rightButtonLabel = "End Song"
    } else {
      rightButtonLabel = "Next Verse"
    }

    let rightButtonClassName = !this.props.eventInProgress ? "button-not-allowed" : "button-allowed"

    let rightButton = <ControlsButton
      className={rightButtonClassName}
      label={rightButtonLabel}
      backgroundColor={rightButtonBackground}
      onClick={() => {
        if (this.props.eventInProgress) {
          this.props.handleNext(this.props.verses, this.props.id, this.props.selectedVerseId,
            (newVerseId) => {
              this.props.cable.subscription.send({
                selected_verse_id: newVerseId
              })
            }
          )
        }
      }}
    />

    let addVerse = this.props.showAddVerseForm ?
      <VerseForm
        onSubmit={this.props.submitVerseRequest}
        songId={this.props.id}
        verseId={null}
        open={this.props.showAddVerseForm}
        cancel={this.props.toggleAddVerseForm}
        defaultValue=''
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

    let editSong = this.props.showEditSongForm ?
      <div>
        <SongTitleForm
          id={this.props.id}
          toggleForm={this.props.toggleEditSongForm}
          placeholder={null}
          onSubmit={this.props.editTitleRequest}
          value={this.props.songTitleValue}
          defaultValue={this.props.title}
          onChange={this.props.handleSongTitleChange}
        />
      </div>
      :
      <div id='song-title-edit'>
        <span id='song-title'>{this.props.title}</span>
        <EditDeleteButtons
          onClickEdit={this.props.toggleEditSongForm}
          onClickDelete={this.props.toggleDeleteSongForm}
        />
      </div>

    let verses

    if (this.props.verses) {
      verses = this.props.verses.map((verse) => {
        return <SongVerse
          key={verse.id}
          id={verse.id}
          songId={this.props.id}
          lyrics={verse.lyrics}
          selected={this.props.selectedVerseId == verse.id}
          toggleEditVerseForm={this.props.toggleEditVerseForm}
          toggleDeleteVerseForm={this.props.toggleDeleteVerseForm}
        />
      })
    }

    let editVerse

    if (this.props.showEditVerseForm) {
      editVerse =
        <VerseForm
          verseId={this.props.showEditVerseForm.id}
          songId={null}
          onSubmit={this.props.editVerseRequest}
          open={!!this.props.showEditVerseForm}
          cancel={this.props.toggleEditVerseForm}
          defaultValue={this.props.showEditVerseForm.defaultValue}
        />
    }

    let deleteVerse

    if (this.props.showDeleteVerseForm) {
      deleteVerse =
        <DeleteConfirmation
          id={this.props.showDeleteVerseForm}
          deleteRequest={this.props.deleteVerseRequest}
          open={!!this.props.showDeleteVerseForm}
          cancel={this.props.toggleDeleteVerseForm}
          item='verse'
        />
    }

    let deleteSong

    if (this.props.showDeleteSongForm) {
      deleteSong =
        <DeleteConfirmation
          id={this.props.id}
          deleteRequest={this.props.deleteSongRequest}
          open={!!this.props.showDeleteSongForm}
          cancel={this.props.toggleDeleteSongForm}
          item='song'
        />
    }

    return(
      <div id='verses-grid-container'>
        <div id='song-header'>
          <div>
            {editSong}
          </div>

          <div className='green-red-button-div'>
            {leftButton}
            {rightButton}
          </div>
        </div>

        <div id='verses-grid'>
          {verses}
        </div>

        <div id='add-verse-container'>
          {addVerse}
        </div>

        {editVerse}
        {deleteVerse}
        {deleteSong}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SongShowContainer)
