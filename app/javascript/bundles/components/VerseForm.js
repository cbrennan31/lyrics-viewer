import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog';

const VerseForm = (props) => {

  let lyricsArray = props.defaultValue.split("<br />")
  let defaultValue = lyricsArray.join('\n')

  let value

  if (props.value === null) {
    value = defaultValue
  } else {
    value = props.value
  }

  const actions = [
    <RaisedButton
      default={true}
      type="submit"
      id="submit"
      label='Submit'
      labelStyle={{
        textTransform: 'none'
      }}
      className="song-form-button"
      onClick={(e) => {
        e.preventDefault();
        props.onSubmit({
          song_id: props.songId,
          verse_id: props.verseId,
          lyrics: props.value.replace(/\r?\n/g, '<br />')
        });
      }}
    />,
    <RaisedButton
      secondary={true}
      id="cancel"
      label='Cancel'
      labelStyle={{
        textTransform: 'none'
      }}
      className="song-form-button"
      onClick={props.cancel}
    />
  ]
  return(
    <div>
      <Dialog
        actions= {actions}
        open = {props.open}
        actionsContainerStyle = {{
          textAlign: 'center',
          marginTop: '-30px',
          paddingBottom: '24px'
        }}
        contentStyle = {{
          width: '450px',
          textAlign: 'center'
        }}
      >
        <form>
          <label value="Lyrics">
            <TextField
              id="newVerse"
              placeholder={`Press \"Enter\" to add a new line`}
              value={value}
              onChange={props.handleChange}
              multiLine={true}
              style={{
                width: '400px'
              }}
            />
          </label>
        </form>
      </Dialog>
    </div>
  )
}

export default VerseForm;
