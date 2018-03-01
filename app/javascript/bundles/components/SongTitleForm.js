import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField';

const SongTitleForm = (props) => {

  let value

  if (props.value === null) {
    value = props.defaultValue
  } else {
    value = props.value
  }

  return (
    <div>
      <form onSubmit = {(e) => {
          e.preventDefault();
          props.onSubmit({
            id: props.id,
            title: value
          });
        }}
      >
        <label value="Song Title">
          <TextField
            id="songTitle"
            placeholder={props.placeholder}
            value={value}
            onChange={props.onChange}
          />

          <RaisedButton
            default={true}
            type="submit"
            id="submit"
            label='Submit'
            labelStyle={{
              textTransform: 'none'
            }}
            className="song-form-button"
          />

          <RaisedButton
            secondary={true}
            id="cancel"
            label='Cancel'
            onClick={() => props.toggleForm()}
            labelStyle={{
              textTransform: 'none'
            }}
            className="song-form-button"
          />
        </label>
      </form>
    </div>
  )
}

export default SongTitleForm;
