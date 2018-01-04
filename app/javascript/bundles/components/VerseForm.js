import React, { Component } from 'react';

const VerseForm = (props) => {
  let textarea

  return(
    <div>
      <form
        onSubmit = {(e) => {
          e.preventDefault();
          props.onSubmit({
            song_id: props.songid,
            lyrics: textarea.value.replace(/\r?\n/g, '<br />')
          });
          textarea.value = ''
        }}
      >
        <label value="Lyrics">
          <textarea
            type="textarea"
            placeholder={`Press \"Enter\" to add a new line`}
            ref={(node) => {
              textarea = node
            }}
          />
          <input type="submit" id="Submit" />
        </label>
      </form>
    </div>
  )
}

export default VerseForm;
